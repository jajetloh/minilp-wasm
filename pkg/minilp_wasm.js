import * as wasm from "./minilp_wasm_bg.wasm";
import { __wbg_set_wasm } from "./minilp_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./minilp_wasm_bg.js";
