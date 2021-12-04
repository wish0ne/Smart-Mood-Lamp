const path = require('path');
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const axios = require('axios');
const dotenv = require('dotenv');

// 환경변수
dotenv.config();

// http 서버
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.post("/user/getSentiment", async (req, res, next) => {
    try {
        const {text} = req.body;
        const data = {"document": {"type": "PLAIN_TEXT", "content": text}, "encodingType": "UTF8"};
        const apiKey = process.env.API_KEY
        const result = await axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`, data);
        const sentiments = result.data.sentences.map(v => (v.sentiment.score + 1) / 2);
        const io = req.app.get("io");
        io.emit("getsentiments", {sentiments});
        return res.json({sentiments});
    } catch (e) {
        console.error(e);
        next(e);
    }
});
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// 소켓 서버
const {Server} = require("socket.io");
const socketServer = (server, app) => {
    try {
        const io = new Server(server, {path: "/socket.io"});
        app.set("io", io);
        io.on("connection", () => {
            console.log("connection from client checked!");
        });
    } catch (e) {
        console.error(e);
    }
};

// 서버 시작
const http = require("http");
const server = http.createServer(app);
socketServer(server, app);
const portNumber = process.env.PORT_NUMBER
server.listen(portNumber, () => {
    console.log(`Server is listening at port number ${portNumber}`);
});