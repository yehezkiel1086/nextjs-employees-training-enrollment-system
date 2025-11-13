import { verifySession } from "@/app/lib/dal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

const ProfilePage = async () => {
  const session = await verifySession();
  let profile: UserProfile | null = null;
  let error: string | null = null;

  if (session.isAuth && session.email) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/users/${session.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `jwt_token=${session.jwt_token}`
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      profile = await response.json();
    } catch (err: any) {
      console.error("API fetch error:", err);
      error = "Could not load user profile. Please try again later.";
    }
  } else {
    error = "Unauthorized. Please log in to view your profile.";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">My Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User Information</CardTitle>
          <CardDescription>
            Your personal details are displayed below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            profile && (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  <span className="capitalize">{profile.role == "2001"? "User": profile.role == "5150"? "Admin": "?"}</span>
                </p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
