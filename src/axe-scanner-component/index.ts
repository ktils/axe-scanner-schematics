import { basename, dirname, normalize } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  externalSchematic,
  chain,
  Tree,
  apply,
  mergeWith,
  MergeStrategy,
  move,
  template,
  url,
} from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function axeScannerComponent(_options: any): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
    const relPath:any = _options.path + "/" + _options.name;
		_options.name = basename(_options.name);
		_options.path = normalize('/' + dirname((relPath)));
        
		const templateSource = apply(
			url('./files'), [
				template(_options),
				move(_options.path),
			],
		);
        
		return chain([
			externalSchematic('@schematics/angular', 'component', _options),
			mergeWith(templateSource, MergeStrategy.Overwrite),
		]);
	};
}
