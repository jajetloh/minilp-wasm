# minilp WASM

This is repository wraps the [minilp](https://crates.io/crates/minilp) crate for Rust, allow for compilation to WebAssembly, for use in web browsers.

An example application calling the compiled WebAssembly module can be found in ``minilp-wasm-test``.

# How to use in your front-end project

## Option 1
1. Copy and paste the ``pkg`` directory (containing the compiled WebAssembly module) into your JavaScript project.
2. Add a dependency to the folder to your ``package.json`` file e.g. 
```json
"dependencies": {
    ...
    "minilp-wasm": "file:path/to/the/pkg"
    ...
},
```
3. Use ``npm install`` to install.
4. For interfaces, copy the definitions in ``minilp-wasm-test/src/app/app.component.ts`` to your project. You can also use the test case defined here to check the solver works.

## Option 2
You can probably using ``npm install`` referencing this git repository directly, but I haven't tried this myself.

# How to build the WebAssembly module

To build the WebAssembly module from scratch, you will need to have the ``cargo`` package and build tool for Rust installed, as well as ``wasm-pack`` (install using ``cargo install wasm-pack``).

Use ``wasm-pack build`` to build. The build will overwrite the ``pkg`` directory if it already exists.
