// https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function

import * as ts from "typescript";

const source = "let x: string  = 'string'";

let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

console.log(JSON.stringify(result));