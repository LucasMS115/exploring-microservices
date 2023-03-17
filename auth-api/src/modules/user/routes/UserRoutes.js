import { Router } from "express";

import UserController from "../controllers/UserController.js";

const router = new Router();
const USER_PATH = '/api/user';

//to do: create a flexible endpoint to get users with custom query params
router.get(`${USER_PATH}/email/:email`, UserController.findByEmail);

export default router;