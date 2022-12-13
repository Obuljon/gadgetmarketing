import express from "express";
import layout from "express-ejs-layouts";
import flash from "express-flash";
import session from "express-session";
import validator from "express-validator";
import moment from "moment";
import { connect } from "mongoose";


import router from "./router/router.js"


const app = express();

connect("mongodb://localhost/mydatabase", {  useNewUrlParser:true, useUnifiedTopology:true });

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(layout);
app.use(validator());
app.use(flash());
app.use(session({
    secret: "213sf345fgg234fgwsdgt324",
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    saveUninitialized:false,
    resave:false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || "";
    res.locals.message = req.flash();
    res.locals.moment = moment;
    next();
});

app.use(router);
app.listen(5050, () => {
    console.log("server is ran in port:5050")
});



