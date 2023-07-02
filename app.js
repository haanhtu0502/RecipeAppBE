import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import categoryRoute from "./routes/category.js";
import recipeRoute from "./routes/recipe.js";
import ingredientRoute from "./routes/ingredient.js";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(
  "mongodb+srv://tuha0502:0898449505%40Tu@cluster0.x2fjrh9.mongodb.net/recipe?retryWrites=true&w=majority",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases();
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
};

const connect = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(
      "mongodb+srv://tuha0502:0898449505%40Tu@cluster0.x2fjrh9.mongodb.net/recipe?retryWrites=true&w=majority"
    );
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    await listDatabases(client);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

mongoose.connection.on("disconnect", function () {
  console.log("Mongo disconnected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/recipe", recipeRoute);
app.use("/ingredient", ingredientRoute);
app.use("/category", categoryRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMess = err.message || "Something wrong!!";
  return res.status(errStatus).json({
    sucess: false,
    status: errStatus,
    message: errMess,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
