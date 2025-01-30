import express from "express";
const routes = express();
import accountRoutes from "./routes/account.routes";

routes.use("/", accountRoutes);

export default routes