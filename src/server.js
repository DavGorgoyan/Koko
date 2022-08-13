import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

import apiRouter from "./router/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rootRoutes = [
    { path: "/api", router: apiRouter }
]

rootRoutes.forEach(el => {
    app.use(el.path, el.router);
})



app.use('*', (req, res) => {
    res.status(404).json({
        message: "Request URL does not exist"
    });
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err?.status || 500).json({
        meta: {
            error: {
                code: err.code || err.errCode || 5000,
                message: err.message || err.errMessage || "Unknown Error"
            },
            status: err?.status || 500
        },
        data: {}
    })
});

export default app;
