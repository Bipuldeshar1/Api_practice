import express from "express";
import  {addNotes, deleteNotes, getNotes, updateNotes, getSingleNotes}  from "../controller/notes.controller.js";
import { validateToken } from "../middlewares/validate.js";

const router =express.Router();

router.use(validateToken);

router.route("/add").post(addNotes);

router.route("/get").get(getNotes);

router.route("/get/:id").get(getSingleNotes);

router.route("/update/:id").patch(updateNotes);

router.route("/delete/:id").delete(deleteNotes);

export {router}