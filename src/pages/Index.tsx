import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
import type { Student } from "../types";
import { useStudentsContext } from "../context";
import { toast } from "../components/sonner";
import { WithdrawalModal } from "../components/WithdrawalModal";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { students, setStudents } = useStudentsContext();
  const [withdrawingStudent, setWithdrawingStudent] = useState<Student | null>(
    null
  );

  const handleWithdrawRequest = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setWithdrawingStudent(student);
    }
  };

  const handleWithdrawConfirm = () => {
    if (!withdrawingStudent) return;

    // Remove student from the list
    setStudents(students.filter((s) => s.id !== withdrawingStudent.id));

    toast.success(
      `${withdrawingStudent.name} has successfully withdrawn ₦${(
        withdrawingStudent.amount +
        withdrawingStudent.amount *
          (withdrawingStudent.tier === 1
            ? 0.05
            : withdrawingStudent.tier === 2
            ? 0.1
            : 0.2)
      ).toLocaleString()}`
    );

    // Close modal
    setWithdrawingStudent(null);
    navigate("/");
  };

  const handleModalClose = () => {
    setWithdrawingStudent(null);
  };

  return (
    <div className="w-full">
      <Dashboard onWithdraw={handleWithdrawRequest} />
      <WithdrawalModal
        student={withdrawingStudent}
        open={!!withdrawingStudent}
        onClose={handleModalClose}
        onConfirm={handleWithdrawConfirm}
      />
    </div>
  );
};

export default DashboardPage;
