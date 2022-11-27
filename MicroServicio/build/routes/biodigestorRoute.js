"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const biodigestorController_1 = __importDefault(require("../controllers/biodigestorController"));
class BiodigestorRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', biodigestorController_1.default.getBiodigestor);
    }
}
const biodigestorRoute = new BiodigestorRoute();
exports.default = biodigestorRoute;
