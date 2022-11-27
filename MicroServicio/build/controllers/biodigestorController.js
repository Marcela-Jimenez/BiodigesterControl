"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BiodigestorController {
    constructor() { }
    getBiodigestor(req, res) {
        res.json({
            'Hola': 'Mundo'
        });
    }
}
const biodigestorController = new BiodigestorController();
exports.default = biodigestorController;
