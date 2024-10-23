"use client";
import React, { useState } from 'react';
import StepOne, { StepOneData } from '../components/StepOne';
import StepTwo, { StepTwoData } from '../components/StepTwo';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [StepOneData, setStepOneData] = useState<StepOneData>({
    email: '',
    firstName: '',
    lastName: '',
    interest: '',
  });

  const handleNext = (data: StepOneData) => {
    setStepOneData(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (data: StepTwoData) => {
    const returnData = { ...StepOneData, ...data};
    console.log('Return Data', returnData )
  };

  return (
    <div className="container">
      <div style={{ padding: '3rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h1>Create Account</h1>
        <br />
        {step === 1 ? (
          <StepOne onNext={handleNext} defaultValues={StepOneData} />
        ) : (
          <StepTwo interest={StepOneData.interest} onBack={handleBack} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Home;
