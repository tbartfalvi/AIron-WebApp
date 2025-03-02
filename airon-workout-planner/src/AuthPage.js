import React, { useState } from 'react';
import {
  Content,
  Header,
  HeaderName,
  Theme,
  Grid,
  Column,
  Form,
  TextInput,
  Button,
  InlineNotification,
} from '@carbon/react';
import { ArrowRight, Login } from '@carbon/icons-react';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock login/signup success
    // In a real app, you would call an API here
    setTimeout(() => {
      onLogin({ email: formData.email, name: formData.name || 'User' });
    }, 1000);
  };

  return (
    <Theme theme="g100">
      <div className="auth-container">
        <Header aria-label="AIron Workout Planner">
          <HeaderName prefix="">AIron Workout Planner</HeaderName>
        </Header>
        <Content>
          <Grid className="auth-grid">
            <Column lg={16} md={8} sm={4} className="auth-form-container">
              <div className="auth-form-wrapper">
                <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
                <p className="auth-subtitle">
                  {isLogin
                    ? 'Sign in to access your workout programs or Create a new program'
                    : 'Join AIron Workout Planner to create personalized workout programs'}
                </p>
                
                {error && (
                  <InlineNotification
                    kind="error"
                    title="Error"
                    subtitle={error}
                    hideCloseButton
                    className="auth-error"
                  />
                )}
                
                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <TextInput
                      id="name"
                      labelText="Full name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="auth-input"
                    />
                  )}
                  
                  <TextInput
                    id="email"
                    labelText="Email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    required
                  />
                  
                  <div id="password-wrapper">
                    <TextInput.PasswordInput
                      id="password"
                      labelText="Password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="auth-input"
                      required
                    />
                  </div>
                  <div id="confirmPassword-wrapper">
                    {!isLogin && (
                      <TextInput.PasswordInput
                        id="confirmPassword"
                        labelText="Confirm password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="auth-input"
                      />
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="auth-submit-button green-button"
                    renderIcon={isLogin ? Login : ArrowRight}
                  >
                    {isLogin ? 'Log in' : 'Create account'}
                  </Button>
                </Form>
                
                <div className="auth-toggle">
                  <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Button kind="ghost" onClick={toggleForm} className="auth-toggle-button">
                      {isLogin ? 'Create an account' : 'Log in'}
                    </Button>
                  </p>
                </div>
              </div>
            </Column>
          </Grid>
        </Content>
      </div>
    </Theme>
  );
};

export default AuthPage;