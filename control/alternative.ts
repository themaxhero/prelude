import kind from '../kind.ts';
import Applicative from './applicative.ts';
import Plus from './plus.ts';

export interface Alternative<T extends kind> extends Applicative<T>, Plus<T> {}

export default Alternative;
