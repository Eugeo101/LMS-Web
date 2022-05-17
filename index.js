const express = require("express");
const { connect, connection: conn } = require("mongoose");
const errorsMW = require("./middlewares/errors");
const comp = require("compression");
const helmet = require("helmet");
const routes = require("./routers/index.js");

const inProduction = process.env.NODE_ENV == "production";
if (!inProduction) require("dotenv").config();

connect("mongodb+srv://lms:lms@cluster0.srk19.mongodb.net/lms?retryWrites=true&w=majority", {});

const app = express();

app.use(require("cors")());
app.use(comp());
app.use(helmet.xssFilter());
app.use(express.json());
app.use(express.static("public"));


app.use("/api", routes);
app.use(errorsMW);

conn.once("open", () =>
    app.listen(inProduction ? process.env.PORT : 3000, () => {
        console.log("Server on");
    })
);
