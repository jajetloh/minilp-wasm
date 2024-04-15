/* tslint:disable */
/* eslint-disable */

export function solve_lp(problem: LpProblem): [string, number][];

export type LpProblemType = 'Maximize' | 'Minimize'

export type LpComparisonOp = 'Lt' | 'Eq' | 'Gt'

export interface LpConstraint {
  lhs: [string, number][]
  op: LpComparisonOp
  rhs: number
}

export interface LpProblem {
  type: LpProblemType
  variables: [string, number | null, number | null][]
  constraints: LpConstraint[]
  objective: [string, number][]
}
