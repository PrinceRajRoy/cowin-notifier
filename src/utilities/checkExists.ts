import { Session } from "../store/reducers";

export default function checkExists(arr: Session[], value: string): boolean {
  return arr.some((el) => {
    return el.date === value
  })
}