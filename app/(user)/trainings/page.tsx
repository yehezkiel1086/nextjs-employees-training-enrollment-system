import { TrainingsTable } from "@/components/TrainingsTable"

const UserTrainingsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">All Trainings</h1>
      <p>
        List of all available training programs in PT. Century Batteries
        Indonesia
      </p>
      <TrainingsTable email="" />
    </div>
  );
}

export default UserTrainingsPage
