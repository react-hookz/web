import { type DependencyList } from 'react';

export type DependenciesComparator<Deps extends DependencyList = DependencyList> = (
	a: Deps,
	b: Deps
) => boolean;

export type Predicate = (previous: any, next: any) => boolean;

export type ConditionsList = readonly any[];

export type ConditionsPredicate<Cond extends ConditionsList = ConditionsList> = (
	conditions: Cond
) => boolean;
