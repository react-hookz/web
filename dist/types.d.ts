import { DependencyList } from 'react';
export type DependenciesComparator<Deps extends DependencyList = DependencyList> = (a: Deps, b: Deps) => boolean;
export type Predicate = (prev: any, next: any) => boolean;
export type ConditionsList = ReadonlyArray<any>;
export type ConditionsPredicate<Cond extends ConditionsList = ConditionsList> = (conditions: Cond) => boolean;
