import { Component } from '@angular/core'
import { solve_lp, LpProblem } from 'minilp-wasm'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    displayText = ''

    onClick() {
        let lpProblem: LpProblem = {
            type: 'Maximize',
            variables: [
                ['x1', null, null],
                ['x2', null, null],
            ],
            constraints: [
                { lhs: [['x1', 3], ['x2', 1]], op: 'Lt', rhs: 10 },
                { lhs: [['x1', 1], ['x2', 3]], op: 'Lt', rhs: 8 },
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
