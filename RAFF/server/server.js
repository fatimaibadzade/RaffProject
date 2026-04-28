const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const env = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

connectDb();

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "RAFF API is running." });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});
