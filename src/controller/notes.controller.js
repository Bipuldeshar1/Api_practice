import Notes from "../models/note.model.js"
import { asyncHandler } from "../../asyncHandler.js";
const addNotes= asyncHandler(async(req, res) =>{
   // console.log("Request Body:", pm.request.body);

    const{title,description}= req.body;

    if(!title && !description == ""){
       throw new Error("title and des required")
    }
    console.log(title,description);
    

  const note= await Notes.create({
        title,
        description,
    });
  
    return res.status(200).json({note})

}
)

const getNotes =async(req, res) =>{
   const note= await Notes.find();
   res.status(200).json(note);
}

const updateNotes =async(req, res) =>{
  
    const {title,description} =req.body;
    if(!title && !description){
        throw Error('field empty tile and des for update');
    }

   const updateNotes =await Notes.findByIdAndUpdate(req.params.id,{
        $set:{
            title,
            description
        }
    },
    {new:true});
return res.status(200).json(updateNotes);
}

const deleteNotes =async(req, res) =>{
const deletedNote= await Notes.findByIdAndDelete(req.params.id);
return res.status(200).json(deletedNote);
}
export {addNotes,getNotes,updateNotes,deleteNotes}