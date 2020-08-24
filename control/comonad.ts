import Kind, { Ap } from "../kind.ts";
import Extend from "./extend.ts";

export interface Comonad<T extends Kind> extends Extend<T> {
  extract: <a>(t: Ap<T, a>) => a;
}

export default Comonad;
