import { cva } from "class-variance-authority";

export const MAX_STUDENTS = 12;
export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
