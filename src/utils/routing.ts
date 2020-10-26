import { generatePath } from 'react-router';
import { idPattern } from '../constants/regExPatterns';

export const todoDetailRoutePath = `/detail/:id(${idPattern})`;

export type TodoDetailRouteParams = {
  readonly id: Id;
}

export function buildPath<TRouteParams extends AnyObject = never>(route: string, params: TRouteParams): string {
  return generatePath(route, params);
}
