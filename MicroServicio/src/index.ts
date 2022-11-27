import express, { Request,Response, Application } from 'express';
import http from 'http';
import socketio, { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import biodigestorRoute from './routes/biodigestorRoute';

class Servidor{

    app:Application;
    server: any;
    io:any;

    constructor(){
        this.app=express();
        this.server= http.createServer(this.app);
        this.io= new Server(this.server,{
            cors:{
                origin:'http://localhost:4200'
            }
        });
        this.io.use(cors());
        this.io.on('connection',()=>{
            console.log('Usuario Conectado');
        });
        this.config();
        this.routes();
    }
    config():void{
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    routes():void{
        this.app.get('/',(req:Request,res:Response)=>{
            res.json({hola:'mundo'});
            this.io.emit('hola',req.body);
        });
    }
    start():void{
        this.server.listen(this.app.get('port'),()=>{
            console.log('Listen on port:',this.app.get('port'));
        });
    }
}

const servidor = new Servidor();
servidor.start();