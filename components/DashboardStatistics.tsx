"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartPieLabel } from "@/components/ui/chart-pie-label";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartBarDefault } from "@/components/ui/chart-bar-default";

const DashboardStatistics = () => {
  const [trainingStatistics, setTrainingStatistics] = useState({
    total: 0,
    loading: true,
    enrolled: 0,
    completed: 0,
  });

  const getStatistics = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/statistics/trainings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      setTrainingStatistics((prevState) => ({
        ...prevState,
        total: data.total_available_trainings,
        enrolled: data.enrolled_trainings,
        completed: data.completed_trainings,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  const barChartData = [
    { name: "Available", count: trainingStatistics.total },
    { name: "Enrolled", count: trainingStatistics.enrolled },
    { name: "Completed", count: trainingStatistics.completed },
  ];

  return (
    <>
      {trainingStatistics.loading ? (
        <div className="flex gap-4 mt-4">
          <Card className="w-full gap-2">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-1/2" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-3/4" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-1/4" />
            </CardContent>
          </Card>
          <Card className="w-full gap-2">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-1/2" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-3/4" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-1/4" />
            </CardContent>
          </Card>
          <Card className="w-full gap-2">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-1/2" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-3/4" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-12 w-1/4" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex gap-4 mt-4">
          <CountsCard
            title="Total Trainings"
            description="Total available trainings in PT. Century Batteries"
            url="/trainings"
            count={trainingStatistics.total}
          />
          <CountsCard
            title="Enrolled Trainings"
            description="Total training enrollments"
            url="/enrolled-trainings"
            count={trainingStatistics.enrolled}
          />
          <CountsCard
            title="Completed Trainings"
            description="Total trainings completed"
            url="/enrolled-trainings"
            count={trainingStatistics.completed}
          />
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <ChartBarDefault data={barChartData} />
        <ChartPieLabel />
      </div>
    </>
  );
}

const CountsCard = ({
  title = "Title",
  description = "Description",
  url = "/dashboard",
  count = 0,
}: {
  title: string;
  description: string;
  url: string;
  count: number;
}) => {
  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-semibold">
          {String(count).padStart(2, "0")}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={url}>See details &rarr;</Link>
      </CardFooter>
    </Card>
  );
};

export default DashboardStatistics
