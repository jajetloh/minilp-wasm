use wasm_bindgen::prelude::*;
use minilp::{Problem, OptimizationDirection, ComparisonOp, Variable};
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug)]
#[wasm_bindgen]
pub enum LpProblemType {
    Maximize,
    Minimize,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[wasm_bindgen]
pub enum LpComparisonOp {
    Lt,
    Eq,
    Gt,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[wasm_bindgen]
struct LpConstraint {
    lhs: Vec<(String, f64)>,
    op: LpComparisonOp,
    rhs: f64,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[wasm_bindgen]
struct LpProblem {
    r#type: LpProblemType,
    variables: Vec<(String, Option<f64>, Option<f64>)>,
    constraints: Vec<LpConstraint>,
    objective: Vec<(String, f64)>,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn solve_lp(problem: JsValue) -> JsValue {
    let problem_obj: LpProblem = serde_wasm_bindgen::from_value(problem).unwrap();

    let mut p: Problem = Problem::new(match problem_obj.r#type {
        LpProblemType::Maximize => OptimizationDirection::Maximize,
        LpProblemType::Minimize => OptimizationDirection::Minimize,
    });

    let objective_coeffs: HashMap<String, f64> = HashMap::from_iter(problem_obj.objective);

    let var_map: HashMap<String, Variable> = HashMap::from_iter(problem_obj.variables.iter().map(|(varname, min_option, max_option)| {
            let objective_coeff: f64 = match objective_coeffs.get(varname) { Some(x) => *x, None => 0.0 };
            let min = match min_option { Some(x) => x.clone(), None => f64::NEG_INFINITY };
            let max = match max_option { Some(x) => x.clone(), None => f64::INFINITY };
            let var: Variable = p.add_var(objective_coeff, (min, max));
            return (varname.clone(), var)
        })
    );

    problem_obj.constraints.iter().for_each(|constraint| {
        let comp_operator = match constraint.op { LpComparisonOp::Eq => ComparisonOp::Eq, LpComparisonOp::Gt => ComparisonOp::Ge, LpComparisonOp::Lt => ComparisonOp::Le };
        p.add_constraint(constraint.lhs.iter().map(|x| (*var_map.get(&x.0).unwrap(), x.1)), comp_operator, constraint.rhs);
    });

    let solution = p.solve().unwrap();

    let var_values: Vec<(String, f64)> = var_map.into_iter().map(|(varname, var)| (varname, solution[var])).collect();

    serde_wasm_bindgen::to_value(&var_values).unwrap()
}
