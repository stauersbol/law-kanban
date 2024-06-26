import { type Prisma } from "@prisma/client";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Law {
  value: {
    nummer: string;
    titel: string;
    titelkort: string;
    statusid: number;
  }[];
}

interface Status {
  value: {
    status: string;
  }[];
}

export const lawRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    const lawsUrl = "https://oda.ft.dk/api/Sag";
    const lawStatus = "https://oda.ft.dk/api/Sagsstatus";

    const lawsParams = {
      $filter: "typeid eq 3 or typeid eq 5 or typeid eq 9 and periodeid eq 160",
    };

    const lawsRes = (await axios.get<Law>(lawsUrl, { params: lawsParams })).data
      .value;

    // Map the laws to promises that fetch the status of each law.
    const lawsPromises = lawsRes.map(async (law) => {
      const statusParams = {
        $filter: `id eq ${law.statusid}`,
      };

      const statusRes = await axios.get<Status>(lawStatus, {
        params: statusParams,
      });

      const status = statusRes.data.value[0]?.status;

      return {
        number: law.nummer,
        title: law.titel,
        titleShort: law.titelkort,
        status: status,
      };
    });

    // Wait for all promises to settle.
    const lawsSettled = await Promise.allSettled(lawsPromises);

    // Other wait of all promises to settle.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lawsSettled2 = await Promise.all(lawsPromises);

    // Filter out the rejected promises and map the fulfilled promises to the Prisma.LawCreateInput type to be used in the Prisma createManyAndReturn method.
    const laws = lawsSettled
      .filter((law) => law.status === "fulfilled")
      .map(
        (law) => (law as PromiseFulfilledResult<Prisma.LawCreateInput>).value,
      );

    return ctx.db.law.createManyAndReturn({
      data: laws,
      skipDuplicates: true,
    });
  }),

  fetchAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.law.findMany();
  }),
});
