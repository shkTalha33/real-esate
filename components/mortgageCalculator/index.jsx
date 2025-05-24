"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tabs,
  Tab,
  Button,
  Tooltip,
  Slider,
  Input,
} from "@/components/ui";
import { BsFillInfoCircleFill } from "@/public/assets/icons/index";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1000);
  const [hoaFees, setHoaFees] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationData, setAmortizationData] = useState([]);

  // Calculate loan amount when home price or down payment changes
  useEffect(() => {
    const newLoanAmount = homePrice - downPayment;
    setLoanAmount(newLoanAmount > 0 ? newLoanAmount : 0);
    setDownPaymentPercent((downPayment / homePrice) * 100);
  }, [homePrice, downPayment]);

  // Calculate PMI if down payment is less than 20%
  useEffect(() => {
    if (downPaymentPercent < 20) {
      setPmi((homePrice * 0.01) / 12); // 1% of loan amount per year, divided by 12
    } else {
      setPmi(0);
    }
  }, [homePrice, downPaymentPercent]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) return 0;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  // Calculate total monthly payment including taxes, insurance, etc.
  const calculateTotalMonthlyPayment = () => {
    const monthlyPrincipalAndInterest = calculateMonthlyPayment();
    const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const monthlyHoaFees = hoaFees / 12;

    return (
      monthlyPrincipalAndInterest +
      monthlyPropertyTax +
      monthlyHomeInsurance +
      monthlyHoaFees +
      pmi
    );
  };

  // Generate amortization schedule
  const generateAmortizationSchedule = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = calculateMonthlyPayment();
    let balance = loanAmount;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (i % 12 === 0 || i === 1 || i === numberOfPayments) {
        schedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance > 0 ? balance : 0,
        });
      }
    }
    return schedule;
  };

  // Handle show/hide amortization
  const toggleAmortization = () => {
    if (!showAmortization) {
      setAmortizationData(generateAmortizationSchedule());
    }
    setShowAmortization(!showAmortization);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalMonthlyPayment = calculateTotalMonthlyPayment();
  const totalInterest = monthlyPayment * loanTerm * 12 - loanAmount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Input Section */}
      <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
        <Card className="bg-background/50 backdrop-blur-sm border border-default-200/50 shadow-sm">
          <CardHeader>
            <h2 className="text-xl poppins_semibold text-foreground">
              Home Details
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm roboto_medium text-foreground">
                  Home Price
                </label>
                <span className="text-sm roboto_medium text-foreground">
                  {formatCurrency(homePrice)}
                </span>
              </div>
              <Slider
                value={[homePrice]}
                onValueChange={([value]) => setHomePrice(value)}
                min={50000}
                max={2000000}
                step={1000}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm roboto_medium text-foreground">
                  Down Payment
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm roboto_medium text-foreground">
                    {formatCurrency(downPayment)} (
                    {downPaymentPercent.toFixed(1)}
                    %)
                  </span>
                </div>
              </div>
              <Slider
                value={[downPayment]}
                onValueChange={([value]) => setDownPayment(value)}
                min={0}
                max={homePrice}
                step={1000}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm roboto_medium text-foreground mb-2">
                  Loan Term (years)
                </label>
                <Tabs
                  value={loanTerm.toString()}
                  onValueChange={(value) => setLoanTerm(parseInt(value))}
                  className="w-full"
                >
                  <Tab value="15">15 Year</Tab>
                  <Tab value="30">30 Year</Tab>
                </Tabs>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm roboto_medium text-foreground">
                    Interest Rate (%)
                  </label>
                  <span className="text-sm roboto_medium text-foreground">
                    {interestRate}%
                  </span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={1}
                  max={10}
                  step={0.125}
                  className="w-full"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-background/50 backdrop-blur-sm border border-default-200/50 shadow-sm">
          <CardHeader>
            <h2 className="text-xl poppins_medium text-foreground">
              Additional Costs
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm roboto_medium text-foreground">
                  Property Tax (annual)
                  <Tooltip content="Annual property tax as a percentage of home value">
                    <BsFillInfoCircleFill className="inline-block ml-1 w-4 h-4 text-default-400" />
                  </Tooltip>
                </label>
                <div className="flex items-center">
                  <span className="text-sm roboto_medium text-foreground">
                    {propertyTax}%
                  </span>
                </div>
              </div>
              <Slider
                value={[propertyTax]}
                onValueChange={([value]) => setPropertyTax(value)}
                min={0.1}
                max={5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm roboto_medium text-foreground mb-2">
                  Home Insurance (annual)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-default-500">
                    $
                  </span>
                  <Input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm roboto_medium text-foreground mb-2">
                  HOA Fees (monthly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-default-500">
                    $
                  </span>
                  <Input
                    type="number"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Results Section */}
      <motion.div className="lg:col-span-1" variants={itemVariants}>
        <Card className="bg-background/80 backdrop-blur-sm border border-default-200/50 shadow-lg sticky top-6">
          <CardHeader>
            <h2 className="text-xl poppins_medium text-foreground">
              Monthly Payment
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-default-600">Principal & Interest</span>
                <span className="text-lg poppins_medium text-foreground">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-default-600">Property Tax</span>
                <span className="text-foreground">
                  {formatCurrency((homePrice * (propertyTax / 100)) / 12)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-default-600">Home Insurance</span>
                <span className="text-foreground">
                  {formatCurrency(homeInsurance / 12)}
                </span>
              </div>
              {pmi > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-default-600">PMI</span>
                  <span className="text-foreground">{formatCurrency(pmi)}</span>
                </div>
              )}
              {hoaFees > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-default-600">HOA Fees</span>
                  <span className="text-foreground">
                    {formatCurrency(hoaFees / 12)}
                  </span>
                </div>
              )}
              <div className="border-t border-default-200 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg poppins_medium text-foreground">
                  Total Monthly Payment
                </span>
                <span className="text-2xl poppins_semibold text-brand-primary">
                  {formatCurrency(totalMonthlyPayment)}
                </span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
              size="lg"
              onClick={toggleAmortization}
            >
              {showAmortization ? "Hide" : "View"} Amortization Schedule
            </Button>
            <Button
              variant="bordered"
              className="w-full"
              onClick={() => {
                // Reset all values
                setHomePrice(500000);
                setDownPayment(100000);
                setLoanTerm(30);
                setInterestRate(4.5);
                setPropertyTax(1.2);
                setHomeInsurance(1000);
                setHoaFees(0);
              }}
            >
              Reset Calculator
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6 bg-background/50 backdrop-blur-sm border border-default-200/50 shadow-sm">
          <CardBody className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-default-600">Loan Amount</span>
              <span className="roboto_medium text-foreground">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-600">Down Payment</span>
              <span className="roboto_medium text-foreground">
                {formatCurrency(downPayment)} ({downPaymentPercent.toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-600">Total Interest Paid</span>
              <span className="roboto_medium text-foreground">
                {formatCurrency(totalInterest)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-600">Total Cost of Loan</span>
              <span className="roboto_medium text-foreground">
                {formatCurrency(loanAmount + totalInterest)}
              </span>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Amortization Schedule */}
      <AnimatePresence>
        {showAmortization && (
          <motion.div
            className="col-span-full mt-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-background/50 backdrop-blur-sm border border-default-200/50 shadow-sm overflow-hidden">
              <CardHeader>
                <h2 className="text-xl poppins_medium text-foreground">
                  Amortization Schedule
                </h2>
                <p className="text-sm text-default-500">
                  Payment breakdown by year
                </p>
              </CardHeader>
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-default-100/50 border-b border-default-200">
                        <th className="px-6 py-3 text-left text-xs roboto_medium text-default-600 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-right text-xs roboto_medium text-default-600 uppercase tracking-wider">
                          Principal
                        </th>
                        <th className="px-6 py-3 text-right text-xs roboto_medium text-default-600 uppercase tracking-wider">
                          Interest
                        </th>
                        <th className="px-6 py-3 text-right text-xs roboto_medium text-default-600 uppercase tracking-wider">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default-200">
                      {amortizationData.map((row) => (
                        <tr
                          key={row.month}
                          className="hover:bg-default-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm roboto_medium text-foreground">
                            {row.month === 1
                              ? "Year 1"
                              : row.month === 12 * 15 && loanTerm === 15
                              ? "Year 15"
                              : row.month === 12 * 30 && loanTerm === 30
                              ? "Year 30"
                              : row.month % 12 === 0
                              ? `Year ${row.month / 12}`
                              : null}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground">
                            {formatCurrency(row.principal)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground">
                            {formatCurrency(row.interest)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right roboto_medium text-foreground">
                            {formatCurrency(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MortgageCalculator;
