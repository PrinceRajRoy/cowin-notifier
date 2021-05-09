import axios from "axios";
import { store } from "../store";
import { notifyCenters } from "../store/reducers";

export default function setNotifier(hook: string, key: string) {
  function check() {
    store.dispatch(notifyCenters()).then(msg => {
      if(msg.payload) {
        axios.post(`https://maker.ifttt.com/trigger/${hook}/with/key/${key}`, { Value1: msg });
        clearInterval(checkAtInterval);
        alert(msg);
      }
    });
  }
  const checkAtInterval = setInterval(check, 120000);
}