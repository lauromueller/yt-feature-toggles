import express from "express";
import { employees, timeSheetEntries } from "./data";
import { toggleService } from "../config";

const route = express.Router();

const longComputation = (ms: number) => new Promise((r) => setTimeout(r, ms));

const msToHours = (ms: number) => ms / (1000 * 60 * 60);

const computeEmployeeWorkHours = async (
  eId: number
): Promise<number | null> => {
  if (toggleService.systemUnderLoad()) {
    return null;
  }

  await longComputation(500);

  return msToHours(
    timeSheetEntries
      .filter(({ employeeId }) => employeeId === eId)
      .map(
        ({ startTime, endTime }) =>
          new Date(endTime).getTime() - new Date(startTime).getTime()
      )
      .reduce((prev, curr) => prev + curr, 0)
  );
};

route.get("/employees", async (req, res) => {
  const employeeData = employees.map(async (employee) => ({
    ...employee,
    totalHours: await computeEmployeeWorkHours(employee.id),
  }));

  return res.json(await Promise.all(employeeData));
});

route.get("/employee/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id, 10));
  if (!employee) res.status(404).send("Employee not found.");
  res.json(employee);
});

export default route;
