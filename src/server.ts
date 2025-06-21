import mongoose from "mongoose";
import app from "./app";
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect('mongodb+srv://library_management_db:LibMgmt2025@cluster0.exiwnj2.mongodb.net/library_management_db?retryWrites=true&w=majority&appName=Cluster0');
    app.listen(PORT, () => {
      console.log(`App is listing on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main()

