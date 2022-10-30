// eslint-disable-next-line import/no-extraneous-dependencies
import * as ts from 'typescript';
import * as path from 'node:path';

function shouldUpdateImportDeclaration(
  node: ts.Node
): node is (ts.ImportDeclaration | ts.ExportDeclaration) & { moduleSpecifier: ts.StringLiteral } {
  if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) {
    return false;
  }
  if (node.moduleSpecifier === undefined) {
    return false;
  }
  if (!ts.isStringLiteral(node.moduleSpecifier)) {
    return false;
  }
  if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../')) {
    return false;
  }

  return path.extname(node.moduleSpecifier.text) === '';
}

// eslint-disable-next-line import/no-default-export
export default function transformer(_: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (sourceFile) => {
    const fac = context.factory;
    const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
      if (shouldUpdateImportDeclaration(node)) {
        if (ts.isImportDeclaration(node)) {
          const newModuleSpecifier = fac.createStringLiteral(`${node.moduleSpecifier.text}.js`);
          return fac.updateImportDeclaration(
            node,
            node.decorators,
            node.modifiers,
            node.importClause,
            newModuleSpecifier,
            node.assertClause
          );
        }
        if (ts.isExportDeclaration(node)) {
          const newModuleSpecifier = fac.createStringLiteral(`${node.moduleSpecifier.text}.js`);
          return fac.updateExportDeclaration(
            node,
            node.decorators,
            node.modifiers,
            false,
            node.exportClause,
            newModuleSpecifier,
            node.assertClause
          );
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
}
