const express = require("express");
const path=require("path")
const socket = require("socket.io");

const http = require("http");
const {Chess} =  require("chess.js");
// const { log } = require("console");

const app = express();
const server = http.createServer(app);

const io = socket(server);

const port=3000;
const chess = new Chess();
let player ={};
let currentPlayer = "w";

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render("index");
});

io.on("connection",function(uniquesocket){
    console.log("connected");
    if(!player.white){
        player.white=uniquesocket.id;
        uniquesocket.emit("playerRole","w")
    }
    else if(!player.black){
        player.black=uniquesocket.id;
        uniquesocket.emit("playerRole","b");
    }
    else{
        uniquesocket.emit("spectatorRole")
    }
    uniquesocket.on("disconnect",function(){
        if(uniquesocket.id===player.white){
            delete player.white;
            console.log("User disconnected")
        }
        if(uniquesocket.id===player.black){
            delete player.black;
            console.log("User disconnected")
        }
    });
    uniquesocket.on("move",function(move){
        try{
            if(chess.turn==="w" && uniquesocket.id != player.white){
                return;
            }
            if(chess.turn==="b" && uniquesocket.id != player.black){
                return;
            }

            const result = chess.move(move);
            // console.log("result is ",result);
            if(result){
                currentPlayer=chess.turn();
                io.emit("move",move);
                io.emit("boardState",chess.fen())
            }
            else{
                console.log("Invalid move : ",move);
                uniquesocket.emit("Invalid move : ",move);
            }
        } catch(err){
            console.log(err);
            uniquesocket.emit("Invalid move : ",move);

        }
    })
})
server.listen(port,function(){
    console.log(`Server started at port ${port}`);
});