import express, { Router } from 'express';
import authJwt from '../middlewares/authJwt';
import userController from '../controllers/user.controller';

class userRoutes {
  public userRoute: Router;
  constructor(){
    this.userRoute = Router();
    this.userController();
    this.userBarack();
    this.userMarket();
    this.userFarm();
    this.userAttack();
  };
  public userController = () => {
    this.userRoute.get("/detailResources/:idUser", authJwt.authorization, userController.detailResourcesUser);
    this.userRoute.patch("/changeDataUser", authJwt.authorization, userController.userUpdateData);
    this.userRoute.get("/townhall", userController.userTownHall);
  };
  public userBarack = () => {
    this.userRoute.get("/listBarack", userController.listBarack);
    this.userRoute.get("/detailBarack/:idBarack", userController.detailBarack);
    this.userRoute.delete("/barackDestroy/:idBarack", userController.userBarackDestroy);
    this.userRoute.patch("/changeNameBarack/:idBarack", userController.barackChangeName);
    this.userRoute.patch("/collectBarack/:idBarack", userController.collectBarack);
  };
  public userMarket = () => {
    this.userRoute.get("/listMarket", userController.listMarket);
    this.userRoute.get("/detailMarket/:idMarket", userController.detailMarket);
    this.userRoute.delete("/marketDestroy/:idMarket", userController.userMarketDestroy);
    this.userRoute.patch("/changeNameMarket/:idMarket", userController.marketChangeName);
    this.userRoute.patch("/collectMarket/:idMarket", userController.collectMarket);
  };
  public userFarm = () => {
    this.userRoute.get("/listFarm", userController.listFarm);
    this.userRoute.get("/detailFarm/:idFarm", userController.detailFarm);
    this.userRoute.delete("/farmDestroy/:idFarm", userController.userFarmDestroy);
    this.userRoute.patch("/changeNameFarm/:idFarm", userController.farmChangeName);
    this.userRoute.patch("/collectFarm/:idFarm", userController.collectFarm);
  };
  public userAttack = () => {
    this.userRoute.get("/listUserAttack", userController.listUserToAttack);
    this.userRoute.post("/attackNow/:idEnemy", userController.attackUser);
  };
};

const userRouter = new userRoutes().userRoute;
export { userRouter };