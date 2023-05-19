import express, { Request, Response, NextFunction } from "express";
import UsersModel from "../2-models/users-model";
import authService from "../5-services/auth-service";
import CredntialsModel from "../2-models/credentials-model";

const router = express.Router();

// Add user
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UsersModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// Authenticate login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredntialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;