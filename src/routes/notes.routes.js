import express from "express";
import  {addNotes, deleteNotes, getNotes, updateNotes}  from "../controller/notes.controller.js";

const router =express.Router();

router.route("/add").post(addNotes);

router.route("/get").get(getNotes);

router.route("/update/:id").put(updateNotes);

router.route("/delete/:id").delete(deleteNotes);

export {router}