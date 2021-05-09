import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface Session {
  available_capacity: number;
  date: string;
  min_age_limit: number;
  session_id: string;
  slots: string[];
  vaccine: string;
}

export interface Center {
  center_id: number;
  address: string;
  block_name: string;
  district_name: string;
  fee_type: string;
  from: string;
  lat: number;
  long: number;
  name: string;
  pincode: number;
  sessions: Session[];
  state_name: string;
  to: string;
}

export interface AvailableCenter extends Omit<Center, "sessions">, Session {}

const centerAdapter = createEntityAdapter<Center | AvailableCenter>({
  selectId: (center) => center.center_id,
});

const extraState = {
  dates: [""],
  week: [""],
  pins: [""],
  //true for dates search, false for week
  mode: true,
}

const initialState = centerAdapter.getInitialState(extraState);

type InitialState = typeof initialState;
type ExtraState = typeof extraState;

interface FetchAttributes {
  pins: string[];
  dates: string[];
}

export const fetchCenters = createAsyncThunk<
  Center[] | AvailableCenter[],
  FetchAttributes
>("centers/fetchCenters", async ({ pins, dates }) => {
  var result;

  //Search For A Week, Default Case
  if (!dates[0]) {
    let dateParam = new Date().toLocaleDateString("en-GB");
    result = await Promise.all(
      pins.map((pin) =>
        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${dateParam}`
          )
          .then((res) => res.data)
      )
    );
    result = result.reduce((acc, cur) => acc.concat(cur.centers), []);
  }
  //Search For Given Dates
  else {
    let urls = pins.map((pin) =>
      dates.map(
        (date) =>
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
      )
    );

    let arr = [];
    for (let url of urls) for (let e of url) arr.push(e);

    result = await Promise.all(
      arr.map((url) => axios.get(url).then((res) => res.data))
    );
    result = result[0].sessions;
  }

  return result;
});

const centerSlice = createSlice({
  name: "centers",
  initialState: initialState,
  reducers: {
    setInputs: (state, action) => {
      state.dates = action.payload.dates;
      state.pins = action.payload.pins;
      state.mode = action.payload.mode;
      if (action.payload.dates[0] === "") {
        let arr: string[] = Array(7).fill("");
        let tempDate = new Date();
        state.week = arr.map((_, index) => {
          let increment = index === 0 ? 0 : 1;
          tempDate.setDate(tempDate.getDate() + increment);
          return tempDate.toLocaleDateString("en-GB").replaceAll("/", "-");
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCenters.fulfilled,
      (state, action: PayloadAction<Center[] | AvailableCenter[]>) => {
        centerAdapter.removeAll(state);
        centerAdapter.upsertMany(state, action.payload);
      }
    );
  },
});

export const { setInputs } = centerSlice.actions;

export const {
  selectAll: selectCenters,
} = centerAdapter.getSelectors<RootState>((state) => state);

export const selectAvailableCenters = createSelector(selectCenters, (centers) =>
  centers.filter((center) => {
    //Narrowing between the two API responses
    if ("sessions" in center) {
      return center.sessions.filter((session) => session.available_capacity)
        .length;
    }
    return center.available_capacity;
  })
);

type SelectRest<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export const selectRest = createSelector<InitialState, string[], boolean, string[], SelectRest<ExtraState, 'pins'>>(
  state => state.dates,
  state => state.mode,
  state => state.week,
  (dates, mode, week) => ({ dates, mode, week })
)

export default centerSlice.reducer;
