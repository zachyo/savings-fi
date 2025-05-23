import { createContext, useState } from "react";
import type { Student } from "../types";
import { MAX_STUDENTS } from "../lib/constants";
import { toast } from "../components/sonner";

export type StudentsContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  handleStudentRegister: (student: Student) => {
    success: boolean;
  };
};

const StudentsDefaults: StudentsContextType = {
  students: [],
  setStudents: () => undefined,
  handleStudentRegister: () => ({ success: false }),
};

export const StudentsContext = createContext(StudentsDefaults);

export default function StudentsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [students, setStudents] = useState(StudentsDefaults.students);
  const handleStudentRegister = (student: Student) => {
    if (students.length >= MAX_STUDENTS) {
      toast.error("The savings group is currently full");
      return { success: false };
    }

    setStudents([...students, student]);
    return { success: true };
  };

  return (
    <StudentsContext.Provider
      value={{ students, setStudents, handleStudentRegister }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
