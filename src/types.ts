import { DependencyList } from 'react';

export type DependenciesComparator<Deps extends DependencyList = DependencyList> = (
  a: Deps,
  b: Deps
) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Predicate = (prev: any, next: any) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionsList = ReadonlyArray<any>;

export type ConditionsPredicate<Cond extends ConditionsList = ConditionsList> = (
  conditions: Cond
) => boolean;
