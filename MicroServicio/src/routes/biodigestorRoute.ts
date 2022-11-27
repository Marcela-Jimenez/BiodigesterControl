import {Router} from 'express';
import biodigestorController from '../controllers/biodigestorController';

class BiodigestorRoute {
    router:Router;
    constructor(){
        this.router=Router();
        this.config();
    }
    config():void{
        this.router.get('/', biodigestorController.getBiodigestor);
    }
}

const biodigestorRoute = new BiodigestorRoute();
export default biodigestorRoute;