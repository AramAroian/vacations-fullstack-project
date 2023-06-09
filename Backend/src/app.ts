import express from "express";
import expressFileUpload from "express-fileupload"
import cors from "cors";
import dataRoutes from "./6-routes/vacation-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes";
import followRoute from "./6-routes/follow-routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", authRoute)
server.use("/api", dataRoutes);
server.use("/api", followRoute);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
