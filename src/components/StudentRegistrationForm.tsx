import { useState } from "react";
import { TIERS, validateTierAmount } from "../lib/savings";
import type { Student } from "../types";
import { Button } from "../components/button";
import { toast } from "../components/sonner";
import { v4 as uuidv4 } from "uuid";
import { useStudentsContext } from "../context";
import { labelVariants } from "../lib/constants";

import type { Tier } from "../types/index";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function StudentRegistrationForm() {
  const { handleStudentRegister } = useStudentsContext();
  const [name, setName] = useState("");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const inputClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (selectedTier === null) {
      toast.error("Please select a tier");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!validateTierAmount(selectedTier, amountValue)) {
      const tier = TIERS.find((t) => t.id === selectedTier);
      toast.error(
        `The amount must be exactly ₦${tier?.amount.toLocaleString()} for ${
          tier?.name
        }`
      );
      return;
    }

    setIsSubmitting(true);

    // Create new student object
    const newStudent: Student = {
      id: uuidv4(),
      name: name.trim(),
      tier: selectedTier,
      amount: amountValue,
      joinedAt: new Date(),
      interestAccrued: 0,
    };

    // Register the student
    const result = handleStudentRegister(newStudent);
    if (result.success) {
      navigate("/dashboard");
    }

    // Reset form
    setName("");
    setSelectedTier(null);
    setAmount("");
    setIsSubmitting(false);

    toast.success("Successfully joined the savings group!");
  };

  const handleTierSelect = (tierId: number) => {
    setSelectedTier(tierId);
    const tier = TIERS.find((t) => t.id === tierId);
    if (tier) {
      setAmount(tier.amount.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className={labelVariants()} htmlFor="name">
          Full Name
        </label>
        <input
          className={inputClass}
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <label className={labelVariants()}>Select Your Savings Tier</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              isSelected={selectedTier === tier.id}
              onClick={() => handleTierSelect(tier.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelVariants()} htmlFor="amount">
          Amount (₦)
        </label>
        <input
          className={inputClass}
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <p className="text-sm text-gray-500">
          Amount must match your selected tier exactly
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Joining..." : "Join Savings Group"}
      </Button>
    </form>
  );
}

interface TierCardProps {
  tier: Tier;
  isSelected?: boolean;
  onClick?: () => void;
}

export function TierCard({ tier, isSelected, onClick }: TierCardProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        isSelected
          ? "border-purple-500 bg-purple-50 shadow-md"
          : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <p className="text-2xl font-bold mt-2">₦{tier.amount.toLocaleString()}</p>
      <p className="text-sm text-gray-600">
        Interest: {tier.interestRate * 100}% per week
      </p>
      <div
        className={cn(
          "mt-3 h-1 rounded-full",
          tier.id === 1
            ? "bg-blue-400"
            : tier.id === 2
            ? "bg-purple-500"
            : "bg-pink-500"
        )}
      ></div>
    </div>
  );
}
