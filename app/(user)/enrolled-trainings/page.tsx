import { EnrollmentTable } from "@/components/EnrollmentTable";
import { verifySession } from "@/app/lib/dal";

const EnrolledTrainings = async () => {
  const session = await verifySession();
  const email = session?.email;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Enrolled Trainings</h1>
      <p>List of all of your enrolled training programs</p>
      <EnrollmentTable email={email} />
    </div>
  );
};

export default EnrolledTrainings;
