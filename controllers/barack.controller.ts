import { Request, Response, Express, NextFunction } from "express";
import I_Auth from "../interface/I_auth";
import barackSchema from '../models/barack.models';
import userSchema from '../models/user.models';

class baracks {

 // ---------------------------BUILD NEW USER/ PLAYER BARACK --------------------------
  static async createBarack(req: I_Auth, res: Response, next: NextFunction) {
    const {  id_User } = req.body;
    const { Name_Barack } = req.body;
    const { Name_Troop } = req.body;
    const { Amount_Troop } = req.body;

    try {
      const User: any = await userSchema.findById(id_User);
      if (User.Townhall.Gold < 30 && User.Townhall.Food < 30) {
        throw { name: "CANNOT_ACCES_BUILD_BARACK" };
      } else if (User.Townhall.Gold < 30) {
        throw { name: "CANNOT_ACCES_BUILD_BARACK_GOLD" };
      } else if (User.Townhall.Food < 30) {
        throw { name: "CANNOT_ACCES_BUILD_BARACK_FOOD" };
      } else {
        const result = await barackSchema.create(
          {
            id_User: id_User,
            Name_Barack: Name_Barack,
            Name_Troop: Name_Troop,
            Amount_Troop: Amount_Troop,
          }
        );
        await userSchema.findByIdAndUpdate(id_User,
          { $inc: { "Townhall.Gold": -30, "Townhall.Food": -30 }, $push: { Barack: result.id }});
        res.status(200).json({ Message: "Succes! Barack Has Been Builded!", Barack: result });
      }
    } catch (error) {
        next(error);
    } 
  };

}

export default baracks;