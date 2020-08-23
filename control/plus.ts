import kind, { ap } from '../kind.ts';
import Alt from './alt.ts';

export interface Plus<T extends kind> extends Alt<T> {
  zero: <A>() => ap<T, A>;
}

export default Plus;
