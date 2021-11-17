var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');

app.use(express.json()); //웹서버응답
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
        res.send('Hello world\n')
});

app.post("/api/analysis", (req,res) => {
        // analysis로, body로 emotion 보내면 된다. 단, json 형식으로.

        var userBuffer = fs.readFileSync('./storage/user_data.json');
        var userJSON = userBuffer.toString();
        var userData = JSON.parse(userJSON)

        var emotion = req.body;

        var emotionJSON = JSON.stringify(emotion);
        var parsedData = JSON.parse(emotionJSON);//detailjson.negative 같이 거름

        fs.writeFileSync('./storage/analysis/${userData.current_number}.json', emotionJSON);

        res.send('node server received emotion');
});
	  
app.post("/api/text", (req,res) => {
        // "text" : 텍스트 형식으로.
        var text = req.body;
        var userBuffer = fs.readFileSync('./storage/user_data.json');
        var userJSON = userBuffer.toString();
        var userData = JSON.parse(userJSON)

        userData.current_number += 1;

 	    var newJSON = JSON.stringify(userData);
        fs.writeFileSync('./storage/user_data.json', newJSON);
        // user number update

        var textJSON = JSON.stringify(text);
        var parsedData = JSON.parse(textJSON);
        fs.writeFileSync('./storage/texts/${userData.current_number}.json');

        //callback으로 flask에 정보요청
        res.send("node server received text");
});


app.get("/api/text/exist", (req,res)=>{
        var textid = req.query.textid;

});

app.delete("/api/text/exist", (req,res)=>{
        var textid = req.query.textid;
});

app.post("/api/analysis/detail", (req,res) => {

        var userBuffer = fs.readFileSync('./storage/user_data.json');
        var userJSON = userBuffer.toString();
        var userData = JSON.parse(userJSON)

        var detail = req.body; //json 파일으로 받는다.
        //var emotion = req.body.emotion;
        //var positive = req.body.positive;
        //var neutral = req.body.neutral;
        //var negative = req.body.negative;
        var detailJSON = JSON.stringify(detail);
        var parsedData = JSON.parse(detailJSON);//detailjson.negative 같이 거름

        fs.writeFileSync('./storage/analysis_detail/${userData.current_number}.json', detailJSON);
        res.send("node server received analysis detail");
});

app.listen(3000, () => {
        console.log('App is listening 3000 port');
});
