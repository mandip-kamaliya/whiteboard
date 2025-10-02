import express from "express";
import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { createServer } from "http";
import { Server } from "socket.io";

const boardDrawings = new Map();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"public")));


app.get("/board/:boardId",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

io.on("connection",(socket)=>{
    console.log("a new user is connected!!!",socket.id);

    socket.on("join_board",(boardId)=>{
        socket.join(boardId);
        console.log(`User ${socket.id} joined board: ${boardId}`);
            if(boardDrawings.has(boardId)) {
            const existingDrawings = boardDrawings.get(boardId);
            existingDrawings.forEach(drawingData => {
                socket.emit('draw_event_received', drawingData);
            });
        }

        });

     // A user sends drawing data
    socket.on("draw_event", (data) => {
        if (data.boardId) {
            if (!boardDrawings.has(data.boardId)) {
                boardDrawings.set(data.boardId, []);
            }
            boardDrawings.get(data.boardId).push(data);
            
            socket.to(data.boardId).emit('draw_event_received', data);
        }
    });

     socket.on('clear_board', (boardId) => {
        
        if (boardDrawings.has(boardId)) {
            boardDrawings.set(boardId, []);
        }
        
        
        io.to(boardId).emit('board_cleared');
    });

     socket.on('disconnect', () => {
        console.log('🔥 A user disconnected:', socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

