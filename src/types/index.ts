export type Student = {
  id: string;
  name: string;
  tier: number;
  amount: number;
  joinedAt: Date;
  interestAccrued: number;
};

export type Tier = {
  id: number;
  name: string;
  amount: number;
  interestRate: number;
};
