import express from "express";
import {Create, Edit, Find, Form, RemoveUser, Update, View, ViewAll} from "../controllers/user.controller.js";

const router = express.Router();

// Create, Find, Update, Delete
router.get("/", ViewAll);
router.post("/", Find);
router.get("/adduser", Form);
router.post("/adduser", Create);
router.get("/edituser/:id", Edit);
router.post("/edituser/:id", Update);
router.get("/viewuser/:id", View);
router.get("/:id", RemoveUser);



export default router;
