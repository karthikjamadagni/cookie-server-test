import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

//const whitelist = ['http://127.0.0.1:5173', 'http://localhost:5173', 'https://mycookie-test.netlify.app/'];

// const corsOptions = {
//     credentials: true,
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Blocked by Cors policy"));
//         }
//     },

// }

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors(corsOptions))
app.use(cookieParser());

app.use(cors());

app.all('/login', async (req, res) => {
    try{
        const httponlyCookie = req.cookies['token'];
    console.log("The http only cookie: ", httponlyCookie);
    const { x, y } = req.body;
    console.log(x, y);
    const user = { x, y }
    const access_token = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    console.log(access_token);
    res.cookie("token", access_token, {
        sameSite: 'strict',
        path: '/',
        httpOnly: true,
        secure: true,
        expires: new Date(new Date().getTime() + 30 * 1000),
    }).send("Hello there");
    }
    catch(err) {
        console.log(err);
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk3MDE4OTV9.5w1rQrCp5WAw8508YvdBJPQg95PLWlbA93woy5NMh44
