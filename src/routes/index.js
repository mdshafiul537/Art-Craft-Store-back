import { userRoute } from "./user.route.js";

const userUrl = "/api/users";
export default (app) => {
  app.use(userUrl, userRoute);

  app.use("/health-check", (req, resp) => {
    console.log("It Work DB USER ", process.env.DB_USER);
    resp.send({ status: "ok" });
  });

  app.use("/", (req, resp) => {
    resp.send("ok");
  });
};
