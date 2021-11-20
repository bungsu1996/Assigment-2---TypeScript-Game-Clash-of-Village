import { Model, Schema, model } from 'mongoose';
import I_market from '../interface/I_market';

const marketSchema = new Schema (
  {
    id_User: { type: Schema.Types.ObjectId, ref: "User_Player" },
    Name_Market: { type: String, require: true, unique: true },
    Gold_Market: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    versionKey: false,
  },  
)

const Market: Model<I_market> = model<I_market>("User_Market", marketSchema);
export default Market;