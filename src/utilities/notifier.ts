import axios from "axios";
import { store } from "../store";
import {
  fetchCenters,
  selectAvailableCenters,
  toggleModal,
} from "../store/reducers";
import myAudio from "../audio/notify.mp3";

export default function setNotifier(
  key: string,
  timer: number,
  dates: string[],
  pins: string[],
  desktop: boolean,
  mobile: boolean,
  gmail: boolean,
  hook = "notify"
) {
  var audio = new Audio(myAudio);
  const dispatch = store.dispatch;
  function check() {
    dispatch(fetchCenters({ dates, pins })).then(() => {
      const storeState = store.getState();
      const availableCenters = selectAvailableCenters(storeState);

      if (timer && (mobile || desktop || gmail)) {
        if (availableCenters.length) {
          var msg = availableCenters.map((center) => {
            return `${center.name}, ${
              center.address
            } - Total Slots (${center.sessions.reduce(
              (sl, csl) => sl + csl.available_capacity,
              0
            )})`;
          }, "Slots Available");
          if (key) {
            axios.post(
              `https://cowin-notifier.netlify.app/.netlify/functions/notify?hook=${hook}&key=${key}&msg=${msg}`,
              {
                Value1: msg,
              }
            );
          }
          if (desktop) {
            dispatch(toggleModal(msg));
            audio.play();
          }
        }
        clearInterval(checkAtInterval);
      }
    });
  }
  check();
  const checkAtInterval = setInterval(check, timer * 60000);
}
