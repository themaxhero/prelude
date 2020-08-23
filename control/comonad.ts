import kind, { ap } from "../kind.ts";
import Extend from "./extend.ts";

export interface Comonad<T extends kind> extends Extend<T> {
  extract: <a>(t: ap<T, a>) => a;
}

export default Comonad;
