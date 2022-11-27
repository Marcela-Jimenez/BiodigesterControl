"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: 'http://localhost:4200'
            }
        });
        this.io.use((0, cors_1.default)());
        this.io.on('connection', () => {
            console.log('Usuario Conectado');
        });
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ hola: 'mundo' });
            this.io.emit('hola', req.body);
        });
    }
    start() {
        this.server.listen(this.app.get('port'), () => {
            console.log('Listen on port:', this.app.get('port'));
        });
    }
}
const servidor = new Servidor();
servidor.start();
