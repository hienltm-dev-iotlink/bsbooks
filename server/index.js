import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// middleware
import { sessionMiddleware } from "./middlewares/session.middleware.js";


// router
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import sesionRoutes from './routes/session.js';

const app = express();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser("KEYY"))
app.use(sessionMiddleware)
const CONNECTION_URL = 'mongodb://localhost:27017/bsbooks';
const PORT = process.env.PORT || 5000;


app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/session', sesionRoutes)

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((error) => {
        //
        console.log(error.message)
    });


mongoose.set('useFindAndModify', false);