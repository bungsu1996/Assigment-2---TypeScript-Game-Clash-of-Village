import { Express, Request, Response, NextFunction } from "express";

import I_Auth from "../interface/I_auth";
import farmSchema from '../models/farm.models';
import userSchema from '../models/user.models';

class farms {

 // ---------------------------BUILD NEW USER/ PLAYER FARM --------------------------
  static async createFarm(req: I_Auth, res: Response, next: NextFunction) {
    const { id_User } = req.body;
    const { Name_Farm } = req.body;
    const { Farm_Food } = req.body;
    
    try {
      const User: any = await userSchema.findById(id_User);
      if (User.Townhall.Gold < 10 && User.Townhall.Food < 30) {
        throw { name: "CANNOT_ACCES_BUILD_FARM" };
      } else if (User.Townhall.Gold < 10) {
        throw { name: "CANNOT_ACCES_BUILD_FARM_GOLD" };
      } else if (User.Townhall.Food < 30) {
        throw { name: "CANNOT_ACCES_BUILD_FARM_FOOD" };
      } else {
        const result = await farmSchema.create(
          {
            id_User: id_User,
            Name_Farm: Name_Farm,
            Farm_Food: Farm_Food,
          }
        );    
        await userSchema.findByIdAndUpdate(id_User,
          {
            $inc: { "Townhall.Gold": -10, "Townhall.Food": -30 },
            $push: { Farm: result.id }
          }
        );
        res.status(200).json({ Message: "Succes! Farm Has Been Builded!", Farm: result });
      };
    } catch (error) {
        next(error);
    }
  };
};

export default farms;