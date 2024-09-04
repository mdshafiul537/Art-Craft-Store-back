import { categoryRoute } from "./category.route.js";
import { craftRoute } from "./craft.route.js";
import { userRoute } from "./user.route.js";

const userUrl = "/api/users";
const productUrl = "/api/products";
const categoryUrl = "/api/categories";
export default (app) => {
  app.use(userUrl, userRoute);
  app.use(productUrl, craftRoute);
  app.use(categoryUrl, categoryRoute);

  app.use("/health-check", (req, resp) => {
    console.log("It Work DB USER ", process.env.DB_USER);
    resp.send({ status: "ok" });
  });

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
};
