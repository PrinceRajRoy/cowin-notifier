import { Session } from "../store/reducers";

export default function checkExists(arr: Session[], value: string): boolean {
  return arr.some((el) => {
    return el.date === value;
  });
}

export type checkTypeExists<T, U> = U extends keyof (keyof T) ? true : false;
