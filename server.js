import http from "http";
import path from "path";
import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { default as logger } from "morgan";
import { createStream } from "rotating-file-stream";
import { default as DBG } from "debug";
import exphbs from "express-handlebars"


import __dirname from "./approotdir.js";
import db from "./server/model/index.js";
import UserRoute from "./server/routes/user.js"
import {basicErrorHandler, handle404, normalizePort, onError, onListening} from "./server/utils/utils";

// Global variables
const debug = DBG('server:debug');
const dbgerror = DBG('server:error');

// Db synchronisation
const eraseDatabase = true
db.sequelize.sync({force: eraseDatabase}).then(async () => {
    if (eraseDatabase) {
        await db.User.bulkCreate([
            {
                first_name: "Amina",
                last_name: "Dahatu",
                email:     "adahatu@user.com",
                phone:     "+2347023456789",
                comment: "",
            },
            {
                first_name: "Ali",
                last_name: "Abubakar",
                email:     "aabubakar@user.com",
                phone:     "+2347023456789",
                comment: "",
            },
            {
                first_name: "Usman",
                last_name: "Abubakar",
                email:     "usmanabubakar@gmail.com",
                phone:     "+2347023456789",
                comment: "",
            }
        ])
    }
    debug("Drop and re-sync db.")
}).catch((err) => {
    dbgerror(err);
})

// Initialize the express app object
export const app = express();

// Setting api port
export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'common', {
    stream: process.env.REQUEST_LOG_FILE  || 'log.txt' ?
        createStream(process.env.REQUEST_LOG_FILE || 'log.txt', {
            size: '10M',
            interval: '1d',
            compress: 'gzip',
            path: path.join(__dirname, 'logs')
        })
        : process.stdout
}));

// Templating engine
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set("view engine", ".hbs");

// Router
app.use("/", UserRoute);

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const server = http.createServer(app);
server.listen(port);

// Server Event handling
server.on('request', (req, res) => {
    debug(`${new Date().toISOString()} request: ${req.method} ${req.url}`);
});
server.on("error", onError);
server.on("listening", onListening);
