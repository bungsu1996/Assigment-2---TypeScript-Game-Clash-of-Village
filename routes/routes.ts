import express, { Router } from "express";
import authJwt from '../middlewares/authJwt';
import userController from '../controllers/user.controller';

import { userRouter } from "./user.routes";
import { barackRouter } from "./barack.routes";
import { marketRouter } from "./market.routes";
import { farmRouter } from "./farm.routes";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.adminManage();
    this.user();
    this.auth();
    this.userRoutes();
    this.barackRoutes();
    this.marketRoutes();
    this.farmRoutes();
  }
  public adminManage = () => {
    this.router.get("/allDataUser" , userController.allUserData);
  };
  public user = () => {
    this.router.post("/register", userController.userRegister);
    this.router.post("/login", userController.userLogin);
  }
  public auth = () => {
    this.router.use(authJwt.authentication);
  };
  public userRoutes = () => {
    this.router.use(userRouter);
  };
  public barackRoutes = () => {
    this.router.use(barackRouter);
  };
  public marketRoutes = () => {
    this.router.use(marketRouter);
  };
  public farmRoutes = () => {
    this.router.use(farmRouter);
  };
};

export default new Routes().router;
