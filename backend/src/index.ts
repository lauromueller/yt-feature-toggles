import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { employeeRoutes } from "./employees";
import { configRoutes } from "./config";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(configRoutes);
app.use(employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
