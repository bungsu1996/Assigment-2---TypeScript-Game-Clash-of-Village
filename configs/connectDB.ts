import mongoose from 'mongoose';
import { CronJob } from 'cron';

import barackSchema from '../models/barack.models';
import marketSchema from '../models/market.models';
import farmSchema from '../models/farm.models';

class connectDB {
  constructor(){}
  public static connect = async () => {
    try {
      const dbPathUrl = "mongodb://localhost:27017/";
      const dbPathName = "Game_Clash_of_Village";
      await mongoose.connect(`${dbPathUrl}${dbPathName}`);
      console.log("Database Mongoose Connected");

      let job = new CronJob('1 * * * * *', async () => {
        await barackSchema.updateMany(
          { 'Amount_Troop': { $lt: 20 } },
          { $inc: { 'Amount_Troop': 1 } }
        );
        await marketSchema.updateMany(
          { 'Gold_Market': { $lt: 20 } },
          { $inc: { 'Gold_Market': 1 } }
        );
        await farmSchema.updateMany(
          { 'Farm_Food': { $lt: 20 } },
          { $inc: { 'Farm_Food': 1 } }
        );
      }, null, true, 'Asia/Jakarta');
      job.start();
    } catch (error) {
        console.log(error);
    }
  }

};

export default connectDB;