import type { Student, Tier } from "../types";

export const TIERS: Tier[] = [
  { id: 1, name: "Tier 1", amount: 10000, interestRate: 0.05 },
  { id: 2, name: "Tier 2", amount: 20000, interestRate: 0.1 },
  { id: 3, name: "Tier 3", amount: 30000, interestRate: 0.2 },
];

export function calculateWeeklyInterest(student: Student): number {
  const tier = TIERS.find((t) => t.id === student.tier);
  if (!tier) return 0;

  return student.amount * tier.interestRate;
}

export function calculateTotalWithdrawal(student: Student): number {
  return student.amount + calculateWeeklyInterest(student);
}

export function validateTierAmount(tierId: number, amount: number): boolean {
  const tier = TIERS.find((t) => t.id === tierId);
  return tier ? tier.amount === amount : false;
}

export function calculateTotalSavings(students: Student[]): number {
  return students.reduce((total, student) => total + student.amount, 0);
}

export function calculateTotalInterest(students: Student[]): number {
  return students.reduce(
    (total, student) => total + calculateWeeklyInterest(student),
    0
  );
}
