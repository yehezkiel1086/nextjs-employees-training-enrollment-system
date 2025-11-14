import { EnrollmentTable } from "@/components/EnrollmentTable";
import { verifySession } from "@/app/lib/dal";

const EnrolledTrainings = async () => {
  const session = await verifySession();

  return (
    <div>
      <h1 className="text-3xl font-semibold">Enrolled Trainings</h1>
      <p>List of all of your enrolled training programs</p>
      <EnrollmentTable email={session?.email} role={session?.role} />
    </div>
  );
};

export default EnrolledTrainings;
