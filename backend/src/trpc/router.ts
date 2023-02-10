import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { ApiContext } from "./index";
import * as utils from "@/utils";

const t = initTRPC.context<ApiContext>().create({});
export const apiRouter = t.router({
  profile: t.procedure
    .input(
      z.object({
        /**
         * LINEアクセストークン
         */
        token: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await utils.verifyToken(input.token);
      const line = await utils.getProfile(input.token);
      return {
        /**
         * LINE ユーザーID
         */
        userId: z.coerce.string().parse(line.userId),
      };
    }),
});
