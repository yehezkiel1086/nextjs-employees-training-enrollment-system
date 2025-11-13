import { TrainingsTable } from "@/components/TrainingsTable"
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

const EnrolledTrainings = async () => {
  const cookie = (await cookies()).get("jwt_token")?.value;
  const session = await decrypt(cookie);

  const email = session?.email;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Enrolled Trainings</h1>
      <p>List of all of your enrolled training programs</p>
      <TrainingsTable email={email} />
    </div>
  );
};

export default EnrolledTrainings
