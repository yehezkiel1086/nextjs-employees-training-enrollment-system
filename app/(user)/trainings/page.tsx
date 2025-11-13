import { TrainingsTable } from "@/components/TrainingsTable";
import { verifySession } from "@/app/lib/dal";

const UserTrainingsPage = async () => {
  const session = await verifySession();

  const email = session?.email;

  return (
    <div>
      <h1 className="text-3xl font-semibold">All Trainings</h1>
      <p>
        List of all available training programs in PT. Century Batteries
        Indonesia
      </p>
      <TrainingsTable email={email} />
    </div>
  );
};

export default UserTrainingsPage;
