import type { Student } from "../types";
import {
  calculateWeeklyInterest,
  calculateTotalWithdrawal,
  TIERS,
} from "../lib/savings";
import { Button } from "../components/button";
import { UserMinus } from "lucide-react";

interface StudentListProps {
  students: Student[];
  onWithdraw: (studentId: string) => void;
}

export function StudentList({ students, onWithdraw }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No students have joined yet.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-lg border">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Tier
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Weekly Interest
            </th>
            <th scope="col" className="px-6 py-3">
              Total Withdrawal
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const tier = TIERS.find((t) => t.id === student.tier);
            const weeklyInterest = calculateWeeklyInterest(student);
            const totalWithdrawal = calculateTotalWithdrawal(student);

            return (
              <tr
                key={student.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">{tier?.name}</td>
                <td className="px-6 py-4">
                  ₦{student.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-green-600">
                  ₦{weeklyInterest.toLocaleString()}
                </td>
                <td className="px-6 py-4 font-semibold">
                  ₦{totalWithdrawal.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onWithdraw(student.id)}
                  >
                    <UserMinus className="h-4 w-4 mr-1" /> Withdraw
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
