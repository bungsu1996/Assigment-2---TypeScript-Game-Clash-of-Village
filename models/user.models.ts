import { Schema, model, Model } from 'mongoose';
import I_user from '../interface/I_user';

const userSchema = new Schema(
  {
    Name: { type: String, required: true },
    Name_Id: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Gender: { type: String, required: true },
    Date_of_Birth: { type: String, default: "16 Januari 1996", required: true },
    Password: { type: String, required: true },
    Townhall: {
      Gold: { type: Number, default: 100,  min: 0, max: 1000 },
      Food: { type: Number, default: 100, min: 0, max: 1000 },
      Troops: { type: Number, default: 0, min: 0, max: 500 },
      Medal: { type: Number, default: 0, min: 0, max: 500 },
    },
    Barack: [{ type: Schema.Types.ObjectId, ref: "User_Barack" }],
    Market: [{ type: Schema.Types.ObjectId, ref: "User_Market" }],
    Farm: [{ type: Schema.Types.ObjectId, ref: "User_Farm" }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<I_user> = model<I_user>("User_Player", userSchema);
export default User;
