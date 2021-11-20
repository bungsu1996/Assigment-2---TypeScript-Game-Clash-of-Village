import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import I_Auth from "../interface/I_auth";
import userSchema from "../models/user.models";
import barackSchema from "../models/barack.models";
import marketSchema from "../models/market.models";
import farmSchema from "../models/farm.models";

class userPlayer {
  // ----------------------------- (ADMIN MANAGE) MENAMPILKAN SELURUH ID USER ------------------------------
  static async allUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userSchema
        .find()
        .populate("Townhall")
        .populate("Barack")
        .populate("Market");
      if (!result) {
        throw { name: "NOT_FOUND_ALL_DATA_PLAYER" };
      }
      res.status(200).json({
        Message: "Warning! Private Object Data!",
        Data_All_Player: result,
      });
    } catch (error) {
      next(error);
    };
  };

  // ----------------------------- USER/ PLAYER REGISTER ------------------------------
  static async userRegister(req: Request, res: Response, next: NextFunction) {
    const { Name } = req.body;
    const { Name_Id } = req.body;
    const { Email } = req.body;
    const { Gender } = req.body;
    const { Date_of_Birth } = req.body;
    const { Password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(Password, salt);

    try {
      if (
        Name === "" &&
        Name_Id === "" &&
        Email === "" &&
        Gender === "" &&
        Date_of_Birth === "" &&
        Password === ""
      ) {
        throw { name: "UNAUTH_REGISTER" };
      }
      const result = await userSchema.create({
        Name: Name,
        Name_Id: Name_Id,
        Email: Email,
        Gender: Gender,
        Date_of_Birth: Date_of_Birth,
        Password: hashedPass,
      });
      res.status(200).json({
        Message: "Succes To Register! Now You Can Log In To Play This Game! ",
        Your_Email: result.Email,
      });
    } catch (error) {
      next(error);
    };
  };

  // ----------------------------- USER/ PLAYER LOGIN ------------------------------
  static async userLogin(req: Request, res: Response, next: NextFunction) {
    const { Email } = req.body;
    const { Password } = req.body;

    try {
      const result = await userSchema.findOne({ Email: Email });
      if (!result) {
        throw { name: "UNAUTHORIZED_EMAIL" };
      }
      const passValidation = bcrypt.compareSync(Password, result.Password);
      if (!passValidation) {
        throw { name: "UNAUTHORIZED_PASSWORD" };
      }
      const token = jwt.sign(
        {
          id: result.id,
          Name: result.Name,
          Name_Id: result.Name_Id,
          Gender: result.Gender,
          Date_of_Birth: result.Date_of_Birth,
        },
        "secretpass"
      );
      res.status(200).json({
        Message: "Succes To Log In!",
        Dear_User: "Happy Play This Game! Don't Forget Sleep And Eat!",
        Email_Login: Email,
        Acces_Token: token,
      });
    } catch (error) {
      next(error);
    };
  };

  // ------------------ USER/ PLAYER SEE DETAIL ALL RESOURCES ----------------------
  static async detailResourcesUser(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;

    try {
      const result = await userSchema
        .findById(id)
        .populate("Townhall")
        .populate("Barack")
        .populate("Market")
        .populate("Farm")
        .select("Name_Id");
      res
        .status(200)
        .json({ Message: "Your Resources Detail.", Detail_Resources: result });
    } catch (error) {
      next(error);
    };
  };

  // ------------------CHANGE DATA  USER/ PLAYER --------------------------
  static async userUpdateData(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;
    const { Name } = req.body;
    const { Gender } = req.body;
    const { Date_of_Birth } = req.body;
    const { Password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(Password, salt);

    try {
      const result = await userSchema.findByIdAndUpdate(
        id,
        {
          Name: Name,
          Gender: Gender,
          Date_of_Birth: Date_of_Birth,
          Password: hashedPass,
        },
        { new: true }
      ).select("Name_Id Name Gender Date_of_Birth Email");
      res
        .status(200)
        .json({ Message: "Succes! To Update Your Data Profil.", Profil: result });
    } catch (error) {
      next(error);
    };
  };

  //////////////////////////--- TOWNHALL USER/ PLAYER ---///////////////////////////////
  // ---------------------------USER/ PLAYER SEE LIST DETAILTOWNHALL --------------------------
  static async userTownHall(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;

    try {
      const result = await userSchema
        .findById(id)
        .select("Name_Id Townhall")
        .populate("Townhall");
      res.status(200).json(result);
    } catch (error) {
      next(error);
    };
  };

  //////////////////////////--- BARACK USER/ PLAYER ---///////////////////////////////
  //---------------------------USER/ PLAYER SEE LIST BARACK --------------------------
  static async listBarack(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;

    try {
      const result = await userSchema.findById(id)
        .select("Barack")
        .populate({ path: "Barack", select: "Name_Barack" });
      res.status(200).json({ List_Barack: result });
    } catch (error) {
      next(error);
    };
  };

  //---------------------------USER/ PLAYER SEE DETAIL BARACK --------------------------
  static async detailBarack(req: I_Auth, res: Response, next: NextFunction) {
    const {idBarack } = req.params;

    try {
      const result = await barackSchema.findById(idBarack)
        .select("Name_Barack Name_Troop Amount_Troop");
      res.status(200).json({ Detail_Barack: result });
    } catch (error) {
        next(error);
    };
  };

  //---------------------------USER/ PLAYER DESTROY BARACK --------------------------
  static async userBarackDestroy(req: I_Auth, res: Response, next: NextFunction) {
    const { id }:any = req.allUser;
    const { idBarack } = req.params;

    try {
      const result = await barackSchema.findByIdAndDelete(idBarack);
      await userSchema.findByIdAndUpdate(id, { $pull: { Barack: idBarack }});
      res.status(200).json({ Message: "Barack Has Been Destroyed!" });
    } catch (error) {
        next(error);
    };
  };

  // ---------------------------CHANGE NAME USER/ PLAYER BARACK --------------------------
  static async barackChangeName(req: I_Auth, res: Response, next: NextFunction) {
    const { idBarack } = req.params;
    const { Name_Barack } = req.body;

    try {
      const result = await barackSchema.findByIdAndUpdate(
        idBarack,
        { Name_Barack: Name_Barack },
        { new: true }
      ).select("Name_Barack");
      res
        .status(200)
        .json({ Message: "Succes! To Change Your Name of Barack!", Data: result });
    } catch (error) {
      next(error);
    };
  };

  // -------------------------- COLLECT TROOP BARACK KE USER TOWNHALL -----------------
  static async collectBarack(req: I_Auth, res: Response, next: NextFunction) {
    const { id }:any = req.allUser;
    const { idBarack } = req.params;

    try {
      const foundBarack: any = await barackSchema.findById(idBarack);
      const result = await barackSchema.findByIdAndUpdate(idBarack,
        { $inc: { Amount_Troop: -foundBarack.Amount_Troop }},
        { new: true }
      ).select("Name_Troop Amount_Troop");
      const updateUser: any = await userSchema.findByIdAndUpdate(id,
        { $inc: { "Townhall.Troops": foundBarack.Amount_Troop }},
        { new: true }
      );
      if (updateUser.Townhall.Troops > 500) {
        await userSchema.findByIdAndUpdate(id, { "Townhall.Troops": 500 });
      };
      res
        .status(200)
        .json({ Message: "Succes! Your Troop From Barack Has Been Collected!", Your_Barack: result });
    } catch (error) {
        next(error);  
    };
  };


  //////////////////////////--- MARKET USER/ PLAYER ---///////////////////////////////
  //---------------------------USER/ PLAYER SEE LIST MARKET --------------------------
  static async listMarket(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;

    try {
      const result = await userSchema
        .findById(id)
        .select("Market")
        .populate({ path: "Market", select: "Name_Market" });
      res.status(200).json({ List_Market: result });
    } catch (error) {
      next(error);
    };
  };

  //---------------------------USER/ PLAYER SEE DETAIL MARKET --------------------------
  static async detailMarket(req: I_Auth, res: Response, next: NextFunction) {
    const { idMarket } = req.params;

    try {
      const result = await marketSchema.findById(idMarket)
        .select("Name_Market Gold_Market");
      res.status(200).json({ Detail_Market: result });
    } catch (error) {
      next(error);
    };
  };


  //---------------------------USER/ PLAYER DESTROY MARKET --------------------------
  static async userMarketDestroy(req: I_Auth, res: Response, next: NextFunction) {
    const { id }:any = req.allUser;
    const { idMarket } = req.params;

    try {
      const result = await marketSchema.findByIdAndDelete(idMarket);
      await userSchema.findByIdAndUpdate(id, { $pull: { Market: idMarket }});
      res.status(200).json({ Message: "Market Has Been Destroyed!" });
    } catch (error) {
      next(error);
    };
  };

  // ---------------------------CHANGE NAME USER/ PLAYER MARKET --------------------------
  static async marketChangeName(req: I_Auth, res: Response, next: NextFunction) {
    const { idMarket } = req.params;
    const { Name_Market } = req.body;

    try {
      const result = await marketSchema.findByIdAndUpdate(
        idMarket,
        { Name_Market: Name_Market },
        { new: true }
      ).select("Name_Market");
      res
        .status(200)
        .json({ Message: "Succes! Change Your Name of Market!", Your_Market: result });
    } catch (error) {
      next(error);
    };
  };

   // -------------------------- COLLECT GOLD MARKET KE USER TOWNHALL --------------------------
   static async collectMarket(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;
    const { idMarket } = req.params;
    
    try {
      const foundMarket: any = await marketSchema.findById(idMarket);
      const result = await marketSchema.findByIdAndUpdate(
        idMarket,
        { $inc: { Gold_Market: -foundMarket.Gold_Market }},
        { new: true }
      ).select("Name_Market Gold_Market");   
      const updatedUser: any = await userSchema.findByIdAndUpdate(
        id,
        { $inc: { "Townhall.Gold": foundMarket.Gold_Market }},
        { new: true }
      );
      if (updatedUser.Townhall.Gold > 1000) {
        await userSchema.findByIdAndUpdate(id, { "Townhall.Gold": 1000 });
      };
      res
        .status(200)
        .json({ Message: "Succes! Your Gold From Market Has Been Collected!", Your_Market: result });
    } catch (error) {
      next(error);
    };
  };


  //////////////////////////--- FARM USER/ PLAYER ---///////////////////////////////
  //---------------------------USER/ PLAYER SEE LIST FARM --------------------------
  static async listFarm(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;

    try {
      const result = await userSchema
        .findById(id)
        .select("Farm")
        .populate({ path: "Farm", select: "Name_Farm" });
      res.status(200).json({ List_Farm: result });
    } catch (error) {
        next(error);
    };
  };

  //---------------------------USER/ PLAYER SEE DETAIL FARM --------------------------
  static async detailFarm(req: I_Auth, res: Response, next: NextFunction) {
    const { idFarm } = req.params;

    try {
      const result = await farmSchema.findById(idFarm)
        .select("Name_Farm Farm_Food");
      res.status(200).json({ Detail_Farm: result });
    } catch (error) {
        next(error);
    };
  };

  //--------------------------- USER/ PLAYER DESTROY FARM --------------------------
  static async userFarmDestroy(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser; 
    const { idFarm } = req.params;
    
    try {
      const result = await farmSchema.findByIdAndDelete(idFarm);
      await userSchema.findByIdAndUpdate(id, { $pull: { Farm: idFarm } });
      res.status(200).json({ Message: "Farm Has Been Destroyed!" });
    } catch (error) {
        next(error);
    };
  };

  // ---------------------------CHANGE NAME USER/ PLAYER FARM --------------------------
  static async farmChangeName(req: I_Auth, res: Response, next: NextFunction) {
    const { idFarm } = req.params;
    const { Name_Farm } = req.body;

    try {
      const result = await farmSchema.findByIdAndUpdate(
        idFarm,
        { Name_Farm: Name_Farm },
        { new: true }
      ).select("Name_Farm");
      res
        .status(200)
        .json({ Message: "Succes! Change Your Name of Farm!", Your_Farm: result });
    } catch (error) {
      next(error);
    };
  };

  // -------------------------- COLLECT GOLD MARKET KE USER TOWNHALL --------------------------
  static async collectFarm(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;
    const { idFarm } = req.params;
    
    try {
      const foundFarm: any = await farmSchema.findById(idFarm);
      const result = await farmSchema.findByIdAndUpdate(
        idFarm,
        { $inc: { Farm_Food: -foundFarm.Farm_Food }},
        { new: true }
      ).select("Name_Farm Farm_Food");   
      const updatedUser: any = await userSchema.findByIdAndUpdate(
        id,
        { $inc: { "Townhall.Food": foundFarm.Farm_Food }},
        { new: true }
      );
      if (updatedUser.Townhall.Food > 1000) {
        await userSchema.findByIdAndUpdate(id, { "Townhall.Food": 1000 });
      };
      res
        .status(200)
        .json({ Message: "Succes! Your Food From Farm Has Been Collected!", Your_Farm: result });
    } catch (error) {
      next(error);
    };
  };


  //////////////////////////--- ATTACK INVADE USER/ PLAYER ---///////////////////////////////
  // -------------------------- LIST PLAYER TO ATTACK --------------------------
  static async listUserToAttack(req: I_Auth, res: Response, next: NextFunction) {

    try {
      const result = await userSchema.find()
      .select("Name_Id Townhall.Troops");
      res.status(200).json({ List_User_To_Attack: result});
    } catch (error) {
        next(error);
    };
  };

  // -------------------------- SIKAT USER AKAN NGE ATTACK --------------------------
  static async attackUser(req: I_Auth, res: Response, next: NextFunction) {
    const { id }: any = req.allUser;
    const { idEnemy } = req.params;
    const { sendTroopAttacker } = req.body; 

    try {
      if (sendTroopAttacker === null && sendTroopAttacker <= 0) {
        throw { name: "YOU_CANNOT_ATTACK" };
      }
      const userEnemy: any = await userSchema.findById(idEnemy);
      const userAttack: any = await userSchema.findById(id);
      if (userEnemy.Townhall.Troops < 50 ) {
        throw { name: "CANNOT_ATTACK_ENEMY" };
      }
      const arr = [];
      for(let i=0; i<3; i++) {
        arr.push(Math.random() < (sendTroopAttacker / (userEnemy.Townhall.Troops + 1)))
      }
      const isSuccess = arr.filter(el => el).length >= 2 ? true : false;
      await userSchema.findByIdAndUpdate(id, 
        { $inc: {"Townhall.Troops": -sendTroopAttacker}}
      );
      if (isSuccess) {
          const attackerWin = await userSchema.findByIdAndUpdate(id, 
            { $inc: {
                      "Townhall.Medal": 5,
                      "Townhall.Food": Math.floor(userEnemy.Townhall.Food/2),
                      "Townhall.Gold": Math.floor(userEnemy.Townhall.Gold/2)
                    }
            }, { new: true }).select("Name_Id Townhall");
          const defenderLose = await userSchema.findByIdAndUpdate(idEnemy, 
            { $inc: { 
                      "Townhall.Gold": -Math.floor(userEnemy.Townhall.Gold/2),
                      "Townhall.Food": -Math.floor(userEnemy.Townhall.Food/2),
                      "Townhall.Troops": -userEnemy.Townhall.Troops
                    }
            }, { new: true }).select("Name_Id Townhall");
          res.status(200).json(
                                {
                                  Message: "Your Troops Succesfull To Attack Enemy!",
                                  Attacker: "Congratulation!! You Are The Winner!", 
                                  Your_Resources_Increase: attackerWin,
                                }
                              );
      } else {
          const attackerLose = await userSchema.findByIdAndUpdate(id,
            { "Townhall.Medal": Math.floor(userAttack.Townhall.Medal/2)},
            { new: true }).select("Name_Id Townhall");
          const defenderWin = await userSchema.findByIdAndUpdate(idEnemy,
            { $inc: { "Townhall.Medal": 2 }}).select("Name_Id Townhall");
          res.status(200).json(
                                { 
                                  Message: "Oopss.. Losser!!",
                                  Attacker: "Oops.. Your Troops Failed To Attack!", 
                                  Your_Lost_Resources: attackerLose,
                                }
                              );
      };
    } catch (error) {
        next(error);
    }
  };

}

export default userPlayer;
