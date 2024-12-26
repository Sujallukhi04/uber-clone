import mongoose from "mongoose";

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Mongo Connected Successfully"))
    .catch((err) => console.log(err));
}

export { connectToDb };
