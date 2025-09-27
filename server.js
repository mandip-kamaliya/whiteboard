import express from "express";
import path from "path";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"public")));

app.listen(prompt,()=>console.log(`server is listening at port number ${PORT}`));

app.get("/board/:boardId",(req,res)=>{
    res.sendFile(path.join(__dirname,"public",index.html));
})

