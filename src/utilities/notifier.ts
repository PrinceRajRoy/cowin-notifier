import axios from "axios";
import { store } from "../store";
import { notifyCenters } from "../store/reducers";
import myAudio from "../audio/notify.mp3";

export default function setNotifier(hook: string, key: string) {
  var audio = new Audio(myAudio);
  function check() {
    store.dispatch(notifyCenters()).then((msg) => {
      if (msg.payload) {
        audio.play();
        axios.post(`https://maker.ifttt.com/trigger/${hook}/with/key/${key}`, {
          Value1: msg,
        });
        alert(msg.payload);
        clearInterval(checkAtInterval);
      }
    });
  }
  const checkAtInterval = setTimeout(check, 10000);
}
