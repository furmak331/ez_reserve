import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const VerificationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const VerificationForm = styled(motion.form)`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${theme.colors.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmitPhone = (e) => {
    e.preventDefault();
    // Handle phone number submission logic here
    console.log('Phone number submitted:', phoneNumber);
    setStep(2);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    // Handle verification code submission logic here
    console.log('Verification code submitted:', verificationCode);
    // Redirect to home page or show success message
  };

  return (
    <VerificationContainer>
      <VerificationForm
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={step === 1 ? handleSubmitPhone : handleSubmitCode}
      >
        <Title>Phone Verification</Title>
        {step === 1 ? (
          <>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Verification Code
            </Button>
          </>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Verify Code
            </Button>
          </>
        )}
      </VerificationForm>
    </VerificationContainer>
  );
}

export default PhoneVerification;