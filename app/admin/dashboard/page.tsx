import { verifySession } from "@/app/lib/dal";
import DashboardStatistics from "@/components/DashboardStatistics";

const AdminDashboardPage = async () => {
  const session = await verifySession();

  return (
    <div>
      <h1 className="text-3xl font-semibold">
        Welcome, {String(session?.name) ?? "User"}!
      </h1>
      <p>
        PT. Century Batteries Indonesia's Employees training enrollment system
      </p>
      <DashboardStatistics />
    </div>
  );
};

export default AdminDashboardPage;
