var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');

app.use(express.json()); //웹 서버 응답
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
        res.send('Hello world\n')
});

app.post("/api/analysis", (req,res) => {
        //analysis로, body로 emotion 보내면 된다. 단, json 형식으로.

        //var userBuffer = fs.readFileSync('./storage/user_data.json');
        //var userJSON = userBuffer.toString();
        //var userData = JSON.parse(userJSON)

        var emotion = req.body;

        var emotionJSON = JSON.stringify(emotion);
        var parsedData = JSON.parse(emotionJSON);//detailjson.negative 같이 거름

        //fs.writeFileSync('./storage/analysis/${userData.current_number}.json', emotionJSON);

        res.send('node server received emotion');
});
	  
app.post("/api/text", (req,res) => {
        //"text" : 텍스트 형식으로.
        var text = req.body;
        //var userBuffer = fs.readFileSync('./storage/user_data.json');
        //var userJSON = userBuffer.toString();
        //var userData = JSON.parse(userJSON)

        //userData.current_number += 1;

 	    //var newJSON = JSON.stringify(userData);
        //fs.writeFileSync('./storage/user_data.json', newJSON);
        // user number update

        var textJSON = JSON.stringify(text);
        var parsedData = JSON.parse(textJSON);
		console.log(parsedData);
		console.log("--------");
		console.log(textJSON);
        //fs.writeFileSync('./storage/texts/${userData.current_number}.json');
		console.log("success");
        //callback으로 flask에 정보요청
        res.send({"sentiments":[0.5,0.7,0.8,1.0,0.1,0.3,0.25,0.05,0.9]});
});


app.get("/api/text/exist", (req,res)=>{
        var textid = req.query.textid;

});

app.delete("/api/text/exist", (req,res)=>{
        var textid = req.query.textid;
});

app.post("/api/analysis/detail", (req,res) => {

        //var userBuffer = fs.readFileSync('./storage/user_data.json');
        //var userJSON = userBuffer.toString();
        //var userData = JSON.parse(userJSON)

        var detail = req.body; //json 파일으로 받는다.
        //var emotion = req.body.emotion;
        //var positive = req.body.positive;
        //var neutral = req.body.neutral;
        //var negative = req.body.negative;
        var detailJSON = JSON.stringify(detail);
        var parsedData = JSON.parse(detailJSON);//detailjson.negative 같이 거름

        //fs.writeFileSync('./storage/analysis_detail/${userData.current_number}.json', detailJSON);
        res.send("node server received analysis detail");
});


const {Server} = require('socket.io');

const socketServer = (server, app) => {
	try{
		const io = new Server(server,{path:"/socket.io"});
		app.set("io", io);
		io.on("connection", (socket) => {
			console.log("good_connection");
			socket.emit("getsentiments", {"sentiments":[0.5,0.7,0.8,1.0,0.1,0.3,0.25,0.05,0.9]});
		});
		io.on("getsentiments", (socket) =>{
			console.log("good_sentiments");
			socket.to(1).emit("getsentiments", {"sentiments":[0.5,0.7,0.8,1.0,0.1,0.3,0.25,0.05,0.9]});
		});
	}
	catch(e){
		console.error(e);
	}
};

const http = require('http');

const server = http.createServer(app);

socketServer(server, app);

server.listen(3000, () => {
        console.log('App is listening 3000 port');
});
