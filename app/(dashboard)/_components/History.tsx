"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Period, TimeFrame } from "@/lib/types";
import { userSettings } from "@prisma/client";
import React, { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { log } from "console";

const History = ({ userSettings }: { userSettings: userSettings }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(
        `/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`
      ).then((res) => res.json()),
  });

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  // const a = historyDataQuery.data.map((item: any) => item.day);
  console.log(historyDataQuery.data);

  const data = {
    labels:
      timeframe === "month"
        ? historyDataQuery.data?.map((item: any) => item.day)
        : historyDataQuery.data?.map((item: any) => item.month + 1),
    datasets: [
      {
        label: "Income",
        data: historyDataQuery.data?.map((item: any) => item.income),
        backgroundColor: "rgb(0, 255, 0)",
      },
      {
        label: "Expense",
        data: historyDataQuery.data?.map((item: any) => item.expense),
        backgroundColor: "rgba(255, 0, 0, 1)",
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart Example",
      },
    },
  };
  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
            <div className="flex h-10 gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable ? (
              <Bar data={data} options={options} />
            ) : (
              <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
                <p>No data for the selected period</p>
                <p className="text-sm text-muted-foreground">
                  Try selecting a different period or adding new transactions.
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
