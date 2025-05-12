import { calculateTotalSavings, calculateTotalInterest } from "../lib/savings";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Wallet, Users } from "lucide-react";
import { StudentList } from "./StudentList";
import { useStudentsContext } from "../context";
import { MAX_STUDENTS } from "../lib/constants";

interface DashboardProps {
  onWithdraw: (studentId: string) => void;
}

export function Dashboard({ onWithdraw }: DashboardProps) {
  const { students } = useStudentsContext();
  const maxStudents = MAX_STUDENTS;
  const totalSavings = calculateTotalSavings(students);
  const totalInterest = calculateTotalInterest(students);

  // Calculate game return (20% of total invested amount)
  const gameReturn = totalSavings * 0.2;

  return (
    <div className="space-y-6 pt-16 lg:pt-20 px-5 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.length}/{maxStudents}
            </div>
            <p className="text-xs text-muted-foreground">
              {((students.length / maxStudents) * 100).toFixed(0)}% Filled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Wallet className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalSavings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Base investment amount
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Weekly Interest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₦{totalInterest.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From all members' tiers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Game Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ₦{gameReturn.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              20% from play-to-earn game
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentList students={students} onWithdraw={onWithdraw} />
        </CardContent>
      </Card>
    </div>
  );
}
