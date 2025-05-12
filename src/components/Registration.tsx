import { StudentRegistrationForm } from "./StudentRegistrationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { useStudentsContext } from "../context";
import { MAX_STUDENTS } from "../lib/constants";

export function Registration() {
  const { students } = useStudentsContext();
  const spotsLeft = MAX_STUDENTS - students?.length;

  if (spotsLeft <= 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings Group</CardTitle>
          <CardDescription>The group is currently full</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No Available Spots</h3>
            <p className="text-gray-500">
              The savings group has reached its maximum capacity of{" "}
              {MAX_STUDENTS} members. Check back later as spots may open up when
              members withdraw.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join the Savings Group</CardTitle>
        <CardDescription>
          {spotsLeft === 1 ? (
            <span className="font-medium text-orange-500">
              Last spot available!
            </span>
          ) : (
            `${spotsLeft} spots available`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StudentRegistrationForm />
      </CardContent>
    </Card>
  );
}
