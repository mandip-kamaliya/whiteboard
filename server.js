import express from "express";
import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,()=>console.log(`server is listening at port number ${PORT}`));

app.get("/board/:boardId",(req,res)=>{
    res.sendFile(path.join(__dirname,"public",index.html));
})

io.on("connection",(socket)=>{
    console.log("a new user is connected!!!");

    socket.on("join_board",(boardId)=>{
        socket.join(boardId);
        console.log(`User ${socket.id} joined board: ${boardId}`);

    });

    socket.on
})

