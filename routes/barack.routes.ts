import { Express, Router } from "express";
import barackController from '../controllers/barack.controller';

class barackRoutes {
  public barackRoute: Router;
  constructor() {
    this.barackRoute = Router();
    this.bBarack();
  };
  public bBarack = () => {
    this.barackRoute.post("/buildBarack", barackController.createBarack);
  };
};

const barackRouter = new barackRoutes().barackRoute;
export { barackRouter };