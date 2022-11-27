import {Request,Response} from 'express';

class BiodigestorController{
    constructor(){}

    getBiodigestor(req:Request, res:Response):void{
        res.json({
            'Hola': 'Mundo'
        });
    }
}

const biodigestorController = new BiodigestorController();
export default biodigestorController;