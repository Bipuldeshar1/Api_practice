import  express  from "express";
import { connectDB } from "./src/db/connect.js";

const app = express();
const PORT = 3000;

connectDB()
.then(app.listen(PORT,()=> {
    console.log(`server is running at ${PORT} GGs`);
}))
.catch((err)=>{
    console.log(`mongodb conn failed ${err}`);
})

;
