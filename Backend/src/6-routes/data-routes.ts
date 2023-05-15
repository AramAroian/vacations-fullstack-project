import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import VacationsModel from "../2-models/vacations-model";
import UsersModel from "../2-models/users-model";

const router = express.Router();

// Get all vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await dataService.getAllVacations();
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Get followed vacations by user id 
router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.id;
        const vacations = await dataService.getFollowedVacations(userId);
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Add vacation
router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationsModel(request.body); 
        const addedVacation = await dataService.addAVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

// Add user
router.post("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UsersModel(request.body); 
        const addedUser = await dataService.addUser(user);
        response.status(201).json(addedUser);
    }
    catch(err: any) {
        next(err);
    }
});

// Delete vacation
router.delete("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteVacation(id);
        response.status(204).json();
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
