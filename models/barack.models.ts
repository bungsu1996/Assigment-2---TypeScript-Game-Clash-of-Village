import { Schema, model, Model } from 'mongoose';
import I_barack from '../interface/I_barack';

const barackSchema = new Schema(
  {
    id_User: { type: Schema.Types.ObjectId, ref: "User_Player" },
    Name_Barack: { type: String, require: true },
    Name_Troop: { type: String, require: true },
    Amount_Troop: { type: Number, min: 0, max: 20, default: 0 },
  },
  {
    versionKey: false,
  }
)

const Barack: Model<I_barack> = model<I_barack>("User_Barack", barackSchema);
export default Barack;