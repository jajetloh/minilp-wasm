import { Component } from '@angular/core'
import { solve_lp } from 'minilp-wasm'

export enum LpProblemType {
    Maximize,
    Minimize,
}

export enum LpComparisonOp {
    Lt,
    Eq,
    Gt,
}

export interface LpConstraint {
    lhs: [string, number][],
    op: LpComparisonOp,
    rhs: number,
}

export interface LpProblem {
    type: LpProblemType,
    variables: [string, number | null, number | null][],
    constraints: LpConstraint[],
    objective: [string, number][],
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    displayText = ''

    onClick() {
        let lpProblem: LpProblem = {
            type: LpProblemType.Maximize,
            variables: [
                ['x1', null, null],
                ['x2', null, null],
            ],
            constraints: [
                { lhs: [['x1', 3], ['x2', 1]], op: LpComparisonOp.Lt, rhs: 10 },
                { lhs: [['x1', 1], ['x2', 3]], op: LpComparisonOp.Lt, rhs: 8 },
            ],
            objective: [
                ['x1', 1],
                ['x2', 1],
            ]
        }

        let solution = solve_lp(lpProblem)
        this.displayText = JSON.stringify(solution)
    }
}
