const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const apiRouter=require('./Api-Router');
const restricted=require('./restricted-middleware');

const server= express();


const sessionConfig={
    name:'sksession',
    secret:'jacksecret',
    cookie:{
        maxAge: 1000*60*60,
        secure:false,
        httpOnly:true
    },
    resave: false,
    saveUninitialized:false,
    store: new knexSessionStore({
        knex: require("./knexfile-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
server.use('/api',apiRouter)

module.exports=server