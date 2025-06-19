import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
let server: Server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect('mongodb+srv://mongoosepractise:mongoosepractise@cluster0.exiwnj2.mongodb.net/mongoosepractise?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(PORT, () => {
      console.log(`App is listing on port${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main()