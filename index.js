import  express  from "express";
import { connectDB } from "./src/db/connect.js";
import {router} from "./src/routes/notes.routes.js";

const app = express();
const PORT = 8000;

connectDB()
.then(app.listen(PORT,()=> {
    console.log(`server is running at ${PORT} GGs`);
}))
.catch((err)=>{
    console.log(`mongodb conn failed ${err}`);
})
app.use(express.json()); 
app.use("/api/notes", router);



