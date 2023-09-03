"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axeScannerComponent = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function axeScannerComponent(_options) {
    return (_tree, _context) => {
        const relPath = _options.path + "/" + _options.name;
        _options.name = core_1.basename(_options.name);
        _options.path = core_1.normalize('/' + core_1.dirname((relPath)));
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(_options),
            schematics_1.move(_options.path),
        ]);
        return schematics_1.chain([
            schematics_1.externalSchematic('@schematics/angular', 'component', _options),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite),
        ]);
    };
}
exports.axeScannerComponent = axeScannerComponent;
//# sourceMappingURL=index.js.map