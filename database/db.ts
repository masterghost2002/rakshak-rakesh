import mongoose from "mongoose";
import config from "../config/config";
mongoose.set('strictQuery', false);
mongoose.connect(config.databaseURI)
    .then(()=>console.log("Connected to database"))
    .catch(err=>console.log(err));

export default mongoose;
