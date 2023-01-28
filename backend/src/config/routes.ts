import express from "express";
import { toggleService } from "./toggle";

const route = express.Router();

route.post("/config", async (req, res) => {
  if (req.body.enableToggles) {
    toggleService.enable();
  } else {
    toggleService.disable();
  }

  return res.json({});
});

export default route;
