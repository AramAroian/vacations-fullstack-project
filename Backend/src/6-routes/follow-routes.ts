import express, { Request, Response, NextFunction } from "express";
import verifyLogin from "../3-middleware/verify-login";
import followService from "../5-services/follow-service";
import FollowersModel from "../2-models/followers-model";
import cyber from "../4-utils/cyber";
;

const router = express.Router();

// Get all followed vacations
router.get("/followed-vacations", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await followService.getAllFollowedVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Get followed vacations by user id 
router.get("/followed-vacations/:userId", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacations = await followService.getFollowedVacationsByUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Follow vacation
router.post("/followed-vacations/:vacationId", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.extractUserFromToken(request);
        const vacationId = +request.params.vacationId;
        const vacationToFollow = new FollowersModel(user.usersId, vacationId);
        const followedVacation = await followService.followVacation(vacationToFollow);
        console.log(followedVacation)
        response.status(201).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Unfollow
router.delete("/followed-vacations/:vacationId", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.extractUserFromToken(request);
        const vacationId = +request.params.vacationId;
        const vacationToUnfollow = new FollowersModel(user.usersId, vacationId);
        const unfollowVacation = await followService.unfollowVacation(vacationToUnfollow);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});



export default router;
