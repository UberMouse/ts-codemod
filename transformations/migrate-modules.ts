/**
 * Created by tushar on 23/07/18
 */

import * as ts from 'typescript'
import {Transformation} from '..'

export default class ArrayToRestParams extends Transformation<{
  modules: {
    [key: string]: string
  }
}> {
  public visit(node: ts.Node): ts.VisitResult<ts.Node> {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      this.params.modules.hasOwnProperty(node.moduleSpecifier.text)
    ) {
      return ts.factory.updateImportDeclaration(
        node,
        node.modifiers,
        node.importClause,
        ts.factory.createStringLiteral(this.params.modules[node.moduleSpecifier.text]),
        node.assertClause
      )
    } else {
      return node
    }
  }
}
