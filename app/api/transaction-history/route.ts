import { GetFormatterForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { OverviewQueryRange } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect("/sign-in"); // Ensure you return a response here
  }

  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQueryRange.safeParse({
    from,
    to,
  });

  if (!queryParams.success) {
    return NextResponse.json(queryParams.error.message, {
      status: 400,
    });
  }

  const transactions = await getTransactionHistory(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );
  return NextResponse.json(transactions); // Return the transactions as a JSON response
}

export type GetTransactionHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;

async function getTransactionHistory(userId: string, from: Date, to: Date) {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });

  if (!userSettings) {
    throw new Error("User settings not found");
  }

  const formatter = GetFormatterForCurrency(userSettings.currency);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    formattedAmount: formatter.format(transaction.amount),
  }));
}
