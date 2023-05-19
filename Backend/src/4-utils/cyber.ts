import UsersModel from "../2-models/users-model";
import jwt from "jsonwebtoken"
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





// async function verifyToken(request: Request): Promise<boolean> {
//     return new Promise<boolean>((resolve, reject) => {
//         const header = request.header("authorization");

//         if (!header) {
//             reject(new UnauthorizedError("Incorrect username or password"));
//         }

//         // Extract token from bearer:
//         const token = header.substring(7);

//         if (!token) {
//             reject(new UnauthorizedError("Incorrect username or password"));
//         }

//         jwt.verify(token, tokenKey, (err) => {
//             if (err) {
//                 reject(new UnauthorizedError("Invalid token"));
//                 return
//             }

//             resolve(true);

//         });

//     });
// }


// async function verifyAdmin(request: Request): Promise<boolean> {
//     return new Promise<boolean>((resolve, reject) => {
//         const header = request.header("authorization");

//         if (!header) {
//             reject(new UnauthorizedError("Incorrect username or password"));
//         }

//         // Extract token from bearer:
//         const token = header.substring(7);

//         if (!token) {
//             reject(new UnauthorizedError("Incorrect username or password"));
//         }

//         jwt.verify(token, tokenKey, (err, container: { user: UsersModel }) => {
//             if (err) {
//                 reject(new UnauthorizedError("Invalid token"));
//                 return
//             }

//             const user = container.user;
//             const authLevel = user.authLevel;

//             if (authLevel !== 'admin') {
//                 reject(new UnauthorizedError("Access denied"));
//                 return
//             }

//             resolve(true);

//         });

//     });

// }

async function verifyTokenAuth(request:Request, requiredAuthLevel?:string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
        const header = request.header("authorization");

        if(!header) {
            reject(new UnauthorizedError("Incorrect username or password"));
        }
        
        // Extract token from bearer:
        const token = header.substring(7); 

        if(!token) {
            reject(new UnauthorizedError("Incorrect username or password"));
        }

        jwt.verify(token, tokenKey, (err, container: {user:UsersModel}) => {
            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return
            }

            const user = container.user;
            const authLevel = user.authLevel;

            if (requiredAuthLevel && authLevel !== requiredAuthLevel) {
                reject(new UnauthorizedError("Access denied"));
                return
            }
            resolve(true);
        }); 
    });
}

async function verifyUser(request: Request): Promise<boolean> {
    try {
        const authorizationStatus = await verifyTokenAuth(request);
        return authorizationStatus;
    } catch (err:any) {
        console.error(err)
    }
  }
  
  async function verifyAdmin(request: Request): Promise<boolean> {
    try {
        const authorizationStatus = await verifyTokenAuth(request, 'admin');
        return authorizationStatus;
    } catch (err:any) {
        console.error(err)
    }
  }
export default {
    createToken,
    // verifyToken,
    verifyAdmin,
    verifyUser
};