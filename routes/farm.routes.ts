import { Express, Router } from "express";
import farmController from '../controllers/farm.controller';

class farmRoutes {
  public farmRoute: Router;
  constructor() {
    this.farmRoute = Router();
    this.manageFarm();
  };
  public manageFarm = () => {
    this.farmRoute.post("/buildFarm", farmController.createFarm);
  };
}

const farmRouter = new farmRoutes().farmRoute;
export { farmRouter };

