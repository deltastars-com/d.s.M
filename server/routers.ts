import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getProducts, getProductById, getCategories, getUserOrders, getOrderById, getUserCart } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }).optional())
      .query(async ({ input }) => {
        const limit = input?.limit || 50;
        const offset = input?.offset || 0;
        return getProducts(limit, offset);
      }),
    getById: publicProcedure
      .input(z.number())
      .query(({ input }) => getProductById(input)),
  }),

  categories: router({
    list: publicProcedure.query(() => getCategories()),
  }),

  orders: router({
    list: protectedProcedure.query(({ ctx }) => getUserOrders(ctx.user.id)),
    getById: protectedProcedure
      .input(z.number())
      .query(({ input }) => getOrderById(input)),
  }),

  cart: router({
    list: protectedProcedure.query(({ ctx }) => getUserCart(ctx.user.id)),
  }),
});

export type AppRouter = typeof appRouter;
