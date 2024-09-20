import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const LoginForm = styled(motion.form)`
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

const GoogleButton = styled(Button)`
  background-color: #4285F4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  &:hover {
    background-color: #3367D6;
  }
`;

const SignUpLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', email, password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Login with Google');
  };

  return (
    <LoginContainer>
      <LoginForm
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Log In</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Log In
        </Button>
        <GoogleButton
          type="button"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogle /> Log In with Google
        </GoogleButton>
        <SignUpLink to="/signup">Don't have an account? Sign up</SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;