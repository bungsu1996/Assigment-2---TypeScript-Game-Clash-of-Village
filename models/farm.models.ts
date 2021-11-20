import { Schema, Model, model} from 'mongoose';
import I_farm from '../interface/I_farm';

const farmSchema = new Schema(
  {
    id_User: { type: Schema.Types.ObjectId, ref: "User_Player" },
    Name_Farm: { type: String, require: true, unique: true },
    Farm_Food: { type: Number, default: 0, min: 0, max: 20 },
  },
  {
    versionKey: false,
  },
);

const Farm: Model<I_farm> = model<I_farm>("User_Farm", farmSchema);
export default Farm;