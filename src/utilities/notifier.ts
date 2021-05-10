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
  hook = "notify"
) {
  var audio = new Audio(myAudio);
  const dispatch = store.dispatch;
  function check() {
    dispatch(fetchCenters({ dates, pins })).then(() => {
      const storeState = store.getState();
      const availableCenters = selectAvailableCenters(storeState);

      if (availableCenters.length) {
        var msg = availableCenters.map((center) => {
          return `${center.name}, ${
            center.address
          } - Total Slots (${center.sessions.reduce(
            (sl, csl) => sl + csl.available_capacity,
            0
          )})`;
        }, "Slots Available");
        if (timer) {
          if (key) {
            axios.post(
              `https://maker.ifttt.com/trigger/${hook}/with/key/${key}`,
              {
                Value1: msg,
              }
            );
          }
          dispatch(toggleModal(msg));
          audio.play();
        }
        clearInterval(checkAtInterval);
      }
    });
  }
  check();
  const checkAtInterval = setTimeout(check, timer * 60000);
}
