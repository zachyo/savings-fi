import { useContext } from "react";
import { StudentsContext } from "./students";

export const useStudentsContext = () => useContext(StudentsContext);
