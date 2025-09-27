import express from "express";
import path, { dirname } from "path";
const app = express();
import { fileURLToPath } from "url";
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,()=>console.log(`server is listening at port number ${PORT}`));

app.get("/board/:boardId",(req,res)=>{
    res.sendFile(path.join(__dirname,"public",index.html));
})

