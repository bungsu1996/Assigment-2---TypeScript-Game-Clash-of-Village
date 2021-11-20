import { Express, Router } from "express";
import marketController from '../controllers/market.controller';

class marketRoutes {
  public marketRoute: Router;
  constructor() {
    this.marketRoute = Router();
    this.manageMarket();

  };
  public manageMarket = () => {
    this.marketRoute.post("/buildMarket", marketController.createMarket);
  };
};

const marketRouter = new marketRoutes().marketRoute;
export { marketRouter };