import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { TrainingsTable } from "@/components/TrainingsTable";

const UserTrainingsPage = async () => {
  const cookie = (await cookies()).get("jwt_token")?.value;
  const session = await decrypt(cookie);

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
