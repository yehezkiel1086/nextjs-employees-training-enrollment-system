import { ChartBarDefault } from "@/components/ui/chart-bar-default"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartPieLabel } from "@/components/ui/chart-pie-label"
import Link from "next/link"

const UserDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Welcome, Yehezkiel Wiradhika</h1>
      <p>PT. Century Batteries Indonesia's Employees training enrollment system</p>
      <div className="flex gap-4 mt-4">
        <CountsCard title="Total Trainings" description="Total available trainings in PT. Century Batteries" />
        <CountsCard title="Enrolled Trainings" description="Total trainings enrolled" />
        <CountsCard title="Completed Trainings" description="Total trainings completed" />
      </div>
      <div className="flex gap-4 mt-4">
        <ChartBarDefault />
        <ChartPieLabel />
      </div>
    </div>
  )
}

const CountsCard = ({title="Title", description="Description"}: {title: string, description: string}) => {
  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-5xl font-semibold">100</p>
      </CardContent>
      <CardFooter>
        <Link href="/trainings">See details &rarr;</Link>
      </CardFooter>
    </Card>
  )
}

export default UserDashboardPage
