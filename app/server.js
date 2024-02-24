const express = require("express");
const path = require("path");
const http = require("http")
const { AllRoutes } = require("./router/router");
const errors = require("http-errors")
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
module.exports =  class Application {
    #app = express()
    #DB_URI;
    #PORT;
    constructor(PORT , DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandler();
    };
    configApplication(){
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended : "true"}));
        this.#app.use(express.static(path.join(__dirname , ".." , "public")))
    };
    createServer(){
    http.createServer(this.#app).listen(this.#PORT , ()=>{
        console.log(
            "run => http://localhost:" + this.#PORT
        );
    })
    };
    createRoutes(){
        this.#app.use(AllRoutes)
    };
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI).then(console.log("connect to DB")).catch((error)=>{console.log(error)});
        mongoose.connection.on("connected" , ()=>{
            console.log("mongodb connected");
        });
        mongoose.connection.on("disconnected" , ()=>{
            console.log("mongodb disconnected");
        });
        process.on("SIGINT" , async ()=>{
            await mongoose.connection.close()
        })

    };
    errorHandler(){
        this.#app.use((req , res , next)=>{
            next(errors.NotFound("صفحه مورد نظر یافت نشد"));

        }),

            this.#app.use((error , req , res , next)=>{
            const serverError = errors.InternalServerError()
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    };
    
}