import mongoose from "mongoose"

const noteSchema =mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },

},{timestamps:true}
);

const Notes= mongoose.model("Notes", noteSchema);
export default Notes;