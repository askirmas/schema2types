
import * as ts from "typescript";
//import * as fs from "fs";

const program = ts.createProgram(["examples/ref/chain.def.ts"], {

})
, checker = program.getTypeChecker()

for (const sourceFile of program.getSourceFiles()) {
  if (!sourceFile.isDeclarationFile) {
    // Walk the tree to search for classes
    ts.forEachChild(sourceFile, visit);
  }
}

function visit(node: ts.Node) :void {
  if (ts.isModuleDeclaration(node)) {
    console.log('moduleDeclaration')
    return ts.forEachChild(node, visit) 
  }

  if (ts.isTypeAliasDeclaration(node)) {
    const symbol = checker.getSymbolAtLocation(node.name)
    console.log(symbol && {
      name: symbol.getName(),
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      ),
    })

  }
}