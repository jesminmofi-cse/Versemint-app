const express= require('express');
const connectDB=require('./config/db');
const aiRouter= require('./routes/aiRoutes');
const cors=require('cors');
require('dotenv').config();
const app=express();
const port=process.env.PORT||5000;
const allowedOrigins=[
    'https://versemint-app.vercel.app',
    'http://localhost:5173'
];
app.use(cors({
    origin:function(origin,callback){
        if (!origin|| allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error('not allowed by cors'));
        }

    },
    credentials:true
}));
connectDB();
app.use(express.json());
app.use('/',aiRouter);
app.listen(port,()=>{
    console.log(`VerseMint running at http://localhost:${port}`);
});
