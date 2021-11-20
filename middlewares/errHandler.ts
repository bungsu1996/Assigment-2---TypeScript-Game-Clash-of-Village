import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

class ErrHandler {
  static handle(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    let code: number = 0;
    let name: string = err.name;
    let message: string = "";

    switch (name) {
      case "NOT_FOUND_ALL_DATA_PLAYER":
        code = 404;
        message = "All Data User/ Player Not Found!!";
        break;
      case "UNAUTH_REGISTER":
        code = 401;
        message = "Failed To Register! Fill In All First!";
        break;
      case "UNAUTHORIZED_TOKEN":
        code = 401;
        message = "Unauthorized!!";
        break;
      case "UNAUTHORIZED_EMAIL":
        code = 400;
        message = "Email Not Match!!";
        break;
      case "UNAUTHORIZED_PASSWORD":
        code = 400;
        message = "Password Not Match!!";
        break;
      case "MISSING_TOKEN":
        code = 401;
        message = "Akses Token Hilang (Anda Belum Login)!!";
        break;
      case "INVALID_TOKEN":
        code = 401;
        message = "Akses Token Tidak Benar!!";
        break;
      case "NOT_FOUND_ALL_DATA_TOWNHALL_USER":
        code = 404;
        message = "Seluruh Data Townhall User Tidak Ditemukan!!";
        break;
      case "CANNOT_ACCES_BUILD_BARACK_GOLD":
        code = 401;
        message = "Gold Kurang Untuk Membangun Barack!!";
        break;
      case "CANNOT_ACCES_BUILD_BARACK_FOOD":
        code = 401;
        message = "Food Kurang Untuk Membangun Barack!!";
        break;
      case "CANNOT_ACCES_BUILD_BARACK":
        code = 401;
        message = "Gold dan Food Kurang Untuk Membangun Barack!!";
        break;
      case "CANNOT_ACCES_BUILD_MARKET":
        code = 401;
        message = "Gold dan Food Kurang Untuk Membangun Market!!";
        break;
      case "CANNOT_ACCES_BUILD_MARKET_GOLD":
        code = 401;
        message = "Gold Kurang Untuk Membangun Market!!";
        break;
      case "CANNOT_ACCES_BUILD_MARKET_FOOD":
        code = 401;
        message = "Food Kurang Untuk Membangun Market!!";
        break;
      case "CANNOT_ACCES_BUILD_FARM":
        code = 401;
        message = "Gold dan Food Kurang Untuk Membangun Farm!!";
        break;
      case "CANNOT_ACCES_BUILD_FARM_GOLD":
        code = 401;
        message = "Gold Kurang Untuk Membangun Farm!!";
        break;
      case "CANNOT_ACCES_BUILD_FARM_FOOD":
        code = 401;
        message = "Food Kurang Untuk Membangun Farm!!";
        break;
      case "YOU_CANNOT_ATTACK":
        code = 401;
        message = "Failed! Your Troop Has Empty To Attack!";
        break;
      case "CANNOT_ATTACK_ENEMY":
        code = 401;
        message = 'Failed! Troops Enemy Less Than 50!';
        break;
      default:
        code = 500;
        message = "Internal Server Error!";
        break;
    }
    res.status(code).json({ Succes: false, Message: message });
  }
}

// const errHand = new ErrHandler();
export { ErrHandler };
