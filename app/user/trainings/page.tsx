import { TrainingsTable } from "@/components/TrainingsTable";
import { verifySession } from "@/app/lib/dal";

const UserTrainingsPage = async () => {
  const session = await verifySession();

  return (
    <div>
      <h1 className="text-3xl font-semibold">All Trainings</h1>
      <p>
        List of all available training programs in PT. Century Batteries
        Indonesia
      </p>
      <TrainingsTable email={session?.email} role={session?.role} />
    </div>
  );
};

export default UserTrainingsPage;
