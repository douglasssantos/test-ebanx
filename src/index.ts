import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes)

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));

