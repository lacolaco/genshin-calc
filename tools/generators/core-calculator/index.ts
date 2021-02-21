import { strings } from '@angular-devkit/core';
import { formatFiles, generateFiles, readProjectConfiguration, Tree } from '@nrwl/devkit';
import * as path from 'path';

export default async function (host: Tree, schema: { name: string }) {
  const coreProject = readProjectConfiguration(host, 'core');

  await generateFiles(host, path.resolve(__dirname, './files'), path.join(coreProject.root, 'src/lib/calculator'), {
    name: schema.name,
    classifiedName: strings.classify(schema.name),
    tmpl: '',
  });
  await formatFiles(host);
  return () => {};
}
