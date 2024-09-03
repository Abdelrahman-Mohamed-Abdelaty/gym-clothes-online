const express= require("express");
const morgan= require("morgan");
const path=require("path");
const cookieParser=require('cookie-parser')
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const xss=require("xss-clean");
const hpp=require('hpp')
const mongoSantize=require("express-mongo-sanitize")
const AppError=require("./utils/appError");
const globalErrorHandler=require("./controllers/errorController")
const userRouter=require("./routes/users");
const productRouter=require("./routes/products");
const compression=require('compression');
const cors=require('cors')
const bodyParser=require('body-parser');
const app=express();

//middlewares

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// app.enable('trust proxy');
app.use(express.static(path.join(__dirname,'public')));

//Implement CORS
app.use(cors());
app.options('*',cors());

const limiter=rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Tour many requests from this IP,please try in an hour'
})
//Data sanitization against NoSQL injection
app.use(mongoSantize())
app.use(compression());//for text send in responses
//Data sanitize against from xss
app.use(xss());

//Prevent parameter pollution
app.use(hpp({
  whitelist:['duration','ratingsQuantity','ratingsAverage','maxGroupSize','price','difficulty']
}));
app.use('/api',limiter);

app.use(cookieParser())
app.use(express.json({limit:'10kb'}));// 10 kilo byte as max for denial attacks
app.use(express.urlencoded({extended:true,limit:'10kb'}));// for sending requests from forms
if(process.env.NODE_ENV==="development"){
  app.use(morgan("dev"))
}

//routes
app.use("/api/v1/products",productRouter);
app.use("/api/v1/users",userRouter);
app.all("*",(req,res,next)=>{
  const err=new AppError(`Can't find ${req.originalUrl} on this server`,404);
  next(err);
});
//Error handling
//express automatically knows it's error handling middleware because it 4 argument
app.use(globalErrorHandler);
module.exports=app;
