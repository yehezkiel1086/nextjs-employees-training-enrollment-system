import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/login");
  return null;
};

export default HomePage;
