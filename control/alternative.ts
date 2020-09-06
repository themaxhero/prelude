import Kind from "../kind.ts";
import Applicative from "./applicative.ts";
import Plus from "./plus.ts";

export interface Alternative<T extends Kind> extends Applicative<T>, Plus<T> {}

export default Alternative;
