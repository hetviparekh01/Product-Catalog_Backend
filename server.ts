import 'reflect-metadata';
import express from "express"
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './src/inversifyConfig/inversify.config';
import cors from "cors";
import config from "config"
import { connectDB } from './src/db/connect';
import path from 'path'
import './src/controllers'
const server=new InversifyExpressServer(container);
server.setConfig(app=>{
    app.use(express.json());
    app.use(cors());
    app.use("/public", express.static(path.join(__dirname, 'public', 'uploads')));
})

const app=server.build();
const port=config.get("PORT")
app.listen(port,()=>{
    console.log(`Server is connected to Port ${port}`);
    connectDB()
    .then(()=>{
        console.log(`DB Connected!!`);
    })
    .catch((error:any)=>{
        console.log(`Error in connecting DB!! ${error.message} `);
    })
})