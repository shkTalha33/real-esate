import { MortgageCalculator } from "@/components/mortgageCalculator";

export const metadata = {
  title: "Mortgage Calculator | Estimate Your Home Loan Payments",
  description:
    "Calculate your monthly mortgage payments with our easy-to-use mortgage calculator. Get instant estimates for your home loan.",
};

export default function MortgageCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl poppins_semibold text-center mb-2 text-foreground">
          Mortgage Calculator
        </h1>
        <p className="text-center text-default-500 roboto_regular mb-12">
          Estimate your monthly mortgage payments with our easy-to-use
          calculator
        </p>
        <MortgageCalculator />
      </div>
    </main>
  );
}
