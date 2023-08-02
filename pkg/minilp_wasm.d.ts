/* tslint:disable */
/* eslint-disable */
/**
* @param {any} problem
* @returns {any}
*/
export function solve_lp(problem: any): any;
/**
*/
export enum LpProblemType {
  Maximize = 0,
  Minimize = 1,
}
/**
*/
export enum LpComparisonOp {
  Lt = 0,
  Eq = 1,
  Gt = 2,
}
/**
*/
export class LpConstraint {
  free(): void;
}
/**
*/
export class LpProblem {
  free(): void;
}
