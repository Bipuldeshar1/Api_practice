import mongoose, { Schema } from "mongoose"

const noteSchema =mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"

    },
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