import { createHTTPServer } from "@trpc/server/adapters/standalone";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env.serve" });
import { apiRouter } from "./trpc/router";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const port = 9000;

createHTTPServer({
  router: apiRouter,
  createContext: () => {
    return {
      event: {} as APIGatewayProxyEventV2,
    };
  },
}).listen(port);
console.log("listening", port);
