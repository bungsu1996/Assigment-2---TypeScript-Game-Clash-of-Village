import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import I_Auth from '../interface/I_auth';



class authJwt {
  static authentication(req: I_Auth, res: Response, next: NextFunction) {
    const { accestoken } = req.headers; 
    if (!accestoken) {
      throw { name: "MISSING_TOKEN" };
    };
    const decoded = <string>jwt.verify(accestoken as string, "secretpass")
    req.allUser = decoded;
    next();
  }


  static async authorization(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;
    const { idUser } = req.params;

    try {
      // const result: any = await userSchema.findById(id);
      if (idUser === id) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      };
    } catch (error) {
        next(error);
    }
  };

};

export default authJwt;

