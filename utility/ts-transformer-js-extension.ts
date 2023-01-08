// eslint-disable-next-line import/no-extraneous-dependencies
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as ts from 'typescript';

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

/**
 * Checks whether provided node imports file or directory.
 */
function isDirectoryImport(
  node: ts.Node & { moduleSpecifier: ts.StringLiteral; original?: ts.Node }
): boolean {
  const importPath = path.resolve(
    path.dirname((node.original ?? node).getSourceFile().fileName),
    node.moduleSpecifier.text
  );

  try {
    return fs.statSync(importPath).isDirectory();
  } catch {
    return false;
  }
}

// eslint-disable-next-line import/no-default-export
export default function transformer(_: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (sourceFile) => {
    const fac = context.factory;
    const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
      if (shouldUpdateImportDeclaration(node) && !isDirectoryImport(node)) {
        if (ts.isImportDeclaration(node)) {
          const newModuleSpecifier = fac.createStringLiteral(`${node.moduleSpecifier.text}.js`);
          return fac.updateImportDeclaration(
            node,
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
