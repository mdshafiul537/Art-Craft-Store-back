import { categoryRoute } from "./category.route.js";
import { craftRoute } from "./craft.route.js";
import { userRoute } from "./user.route.js";
import path from "path";
const __dirname = path.resolve();
const userUrl = "/api/users";
const productUrl = "/api/products";
const categoryUrl = "/api/categories";
export default (app) => {
  app.use(userUrl, userRoute);
  app.use(productUrl, craftRoute);
  app.use(categoryUrl, categoryRoute);

  app.use("/health-check", (req, resp) => {
    // console.log("It Work DB USER ", process.env.DB_USER);
    resp.send({ status: "ok" });
  });

  // app.use("/", (req, resp) => {
  //   resp.send("ok");
  // });

  app.get("*", (__, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
};
