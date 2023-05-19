import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vactions-service";
import VacationsModel from "../2-models/vacations-model";
import imageHandler from "../4-utils/image-handler";
import verifyLogin from "../3-middleware/verify-login";
import verifyAdmin from "../3-middleware/verify-admin";
;

const router = express.Router();

// Get all vacations
router.get("/vacations", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Get vacation by id
router.get("/vacations/:id", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const result = await vacationsService.getVacationById(id);
        const vacation = result[0];        
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Get followed vacations by user id 
router.get("/vacations/user/:id", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.id;
        const vacations = await vacationsService.getFollowedVacationsByUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Add vacation
router.post("/vacations", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationsModel(request.body);
        const addedVacation = await vacationsService.addAVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Update vacation
router.put("/vacations/:id", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationsId = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationsModel(request.body);
        const updatedVacation = await vacationsService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// Delete vacation
router.delete("/vacations/:id", verifyAdmin , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsService.deleteVacation(id);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

// Get image by imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
