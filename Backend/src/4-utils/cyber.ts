import UsersModel from "../2-models/users-model";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";

const tokenKey = "d4d5c4e6Nf3Nf6g3Be7Bg3";

function createToken(user: UsersModel): string {
    // Container
    const container = { user };

    // Options
    const options = { expiresIn: "30m" };

    // The token
    const token = jwt.sign(container, tokenKey, options)

    return token;
}


async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token from bearer:
        const token = header.substring(7);

        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        jwt.verify(token, tokenKey, (err) => {
            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            resolve(true);

        });

    });
}


async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token from bearer:
        const token = header.substring(7);

        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        jwt.verify(token, tokenKey, (err, container: { user: UsersModel }) => {
            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            const user = container.user;
            const authLevel = user.authLevel;

            if (authLevel !== 'admin') {
                reject(new UnauthorizedError("Access denied"));
                return
            }

            resolve(true);

        });

    });

}

async function extractUserFromToken(request: Request): Promise<UsersModel> {
    return new Promise<UsersModel>((resolve, reject) => {
        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        // Extract token from bearer:
        const token = header.substring(7);

        if (!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
            return;
        }

        const tokenData = jwt.decode(token)  as JwtPayload;;
        const user = tokenData.user as UsersModel;
        resolve(user);
    });

}

export default {
    createToken,
    verifyToken,
    verifyAdmin,
    extractUserFromToken
};