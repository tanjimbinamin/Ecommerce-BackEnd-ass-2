import express, { Request, Response } from "express";
import { productsRoute } from "./app/modules/Product/product.routes";
import { orderRoute } from "./app/modules/order/order.routes";

const app = express();

app.use(express.json());

// For product
app.use("/api/products", productsRoute);

// For order
app.use("/api/orders", orderRoute);

app.use((req, res) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! products");
});

export default app;
