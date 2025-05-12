import type { Student } from "../types";
import {
  calculateWeeklyInterest,
  calculateTotalWithdrawal,
} from "../lib/savings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import { Button } from "../components/button";

interface WithdrawalModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function WithdrawalModal({
  student,
  open,
  onClose,
  onConfirm,
}: WithdrawalModalProps) {
  if (!student) return null;

  const weeklyInterest = calculateWeeklyInterest(student);
  const totalWithdrawal = calculateTotalWithdrawal(student);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Withdrawal</DialogTitle>
          <DialogDescription>
            Review the withdrawal details for {student.name}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-gray-500">Principal Amount:</span>
              <span className="font-medium">
                ₦{student.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-gray-500">Interest Earned:</span>
              <span className="font-medium text-green-600">
                ₦{weeklyInterest.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-base font-semibold">Total Withdrawal:</span>
              <span className="text-lg font-bold">
                ₦{totalWithdrawal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className=" gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Withdrawal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
