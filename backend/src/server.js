import express from "express";
import cors from "cors";

import itemRoutes from "./routes/ItemRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import { connectDB } from "./db/connectdb.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));
