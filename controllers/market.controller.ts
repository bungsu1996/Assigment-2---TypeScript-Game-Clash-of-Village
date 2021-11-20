import { Express, Request, Response, NextFunction } from "express";

import I_Auth from "../interface/I_auth";
import marketSchema from '../models/market.models';
import userSchema from '../models/user.models';

class markets {

 // ---------------------------BUILD NEW USER/ PLAYER MARKET --------------------------
  static async createMarket(req: I_Auth, res: Response, next: NextFunction) {
    const { id_User } = req.body;
    const { Name_Market } = req.body;
    const { Gold_Market } = req.body;

    try {
      const User: any = await userSchema.findById(id_User);
      if (User.Townhall.Gold < 30 && User.Townhall.Food < 10) {
        throw { name: "CANNOT_ACCES_BUILD_MARKET" };
      } else if (User.Townhall.Gold < 30) {
        throw { name: "CANNOT_ACCES_BUILD_MARKET_GOLD" };
      } else if (User.Townhall.Food < 10) {
        throw { name: "CANNOT_ACCES_BUILD_MARKET_FOOD" };
      } else {
        const result = await marketSchema.create(
          {
            id_User: id_User,
            Name_Market: Name_Market,
            Gold_Market: Gold_Market,
          }
        );
        await userSchema.findByIdAndUpdate(id_User,
          { 
            $inc: { "Townhall.Gold": -30, "Townhall.Food": -10 },
            $push: { Market: result.id }
          }
        );
        res.status(200).json({ Message: "Succes! Market Has Been Builded!", Market: result});
      }; 
    } catch (error) {
        next(error);
    }
  };
};

export default markets;