import Notes from "../models/note.model.js"


const addNotes= async(req, res) =>{
 

    const{title,description}= req.body;

    if(!title && !description == ""){
       throw new Error("title and des required")
    }
 
    

  const note= await Notes.create({
        title,
        description,
        userId:req.user.id
    });
  
    return res.status(200).json({note})

}

const getNotes =async(req, res) =>{
    console.log(req.user.id);
   const note= await Notes.find({userId:req.user.id});
   res.status(200).json(note);
}

const updateNotes =async(req, res) =>{
    console.log(req.params.id);
  
  const notes= await Notes.findById(req.params.id);
    const {title,description} =req.body;
    if(!title && !description){
        throw Error('field empty tile and des for update');

    }
    console.log(req.user.id);
    console.log(notes.userId);
if(notes.userId != req.user.id){
    res.status(403);
    throw new Error("user dont have permission to update contact");
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
    const notes = await Notes.findById(req.params.id);
    if(notes.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete contact");
    }
const deletedNote= await Notes.findByIdAndDelete(req.params.id);
return res.status(200).json(deletedNote);
}

const getSingleNotes=async(req, res) => {
    const notes = await Notes.findById(req.params.id);
    if(notes.userId.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete contact");
    }
    const note= await Notes.findById(req.params.id);
    return res.status(200).json(note);
}

export {addNotes,getNotes,updateNotes,deleteNotes,getSingleNotes}