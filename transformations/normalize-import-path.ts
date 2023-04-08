import * as ts from 'typescript'
import {Transformation} from '..'

export default class extends Transformation<{module: string}> {
  public visit(node: ts.Node): ts.VisitResult<ts.Node> {
    return ts.isImportDeclaration(node) &&
      node.moduleSpecifier.getText().match(this.params.module)
      ? ts.factory.createImportDeclaration(
          node.modifiers,
          node.importClause,
          ts.factory.createStringLiteral(this.params.module),
          node.assertClause
        )
      : node
  }
}
