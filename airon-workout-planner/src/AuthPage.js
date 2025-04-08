import React, { useState, useEffect } from 'react';
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
  Tile,
} from '@carbon/react';
import { ArrowRight, Login, FitToScreen, View } from '@carbon/icons-react';
import './AuthPage.css';
import apiService from './apiService';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Rotate through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => (prev >= 9 ? 1 : prev + 1));
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async (e) => {
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

    // Show loading state
    setIsLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const userId = await apiService.login(formData.email, formData.password);
        if (userId) {
          const userData = await apiService.getUserInfo(userId);
          onLogin({ id: userId, email: userData.email, name: userData.full_name });
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Handle registration
        const userId = await apiService.register(formData.name, formData.email, formData.password);
        if (userId) {
          // Auto login after registration
          onLogin({ id: userId, email: formData.email, name: formData.name });
        } else {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Theme theme="g100">
      <div className="auth-container">
        <Header aria-label="AIron Workout Planner" className="auth-header">
          <HeaderName prefix="">
            <span className="auth-logo-text">AIron</span> Workout Planner
          </HeaderName>
        </Header>
        
        <div className="auth-content-wrapper">
          <div 
            className="auth-image-section"
            style={{ backgroundImage: `url(/images/im${backgroundImage}.jpg)` }}
          >
            <div className="image-overlay"></div>
            <div className="image-content">
              <h2 className="image-title">Transform Your Fitness Journey</h2>
              <p className="image-description">
                Personalized workout programs designed to help you reach your fitness goals. Trusted by The University of Arizona Powerlifting Team.
              </p>
              <div className="image-features">
                <div className="feature">
                  <FitToScreen size={24} />
                  <span>Custom Programs</span>
                </div>
                <div className="feature">
                  <View size={24} />
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
            <div className="image-indicators">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div 
                  key={num} 
                  className={`indicator ${backgroundImage === num ? 'active' : ''}`}
                  onClick={() => setBackgroundImage(num)}
                ></div>
              ))}
            </div>
          </div>
          
          <Content className="auth-form-section">
            <div className="auth-form-container">
              <Tile className="auth-form-tile">
                <div className="auth-form-wrapper">
                  <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
                  <p className="auth-subtitle">
                    {isLogin
                      ? 'Sign in to access your workout programs'
                      : 'Join AIron Workout Planner to create personalized programs'}
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
                    
                    <div id="confirmPassword-wrapper" className={isLogin ? 'hidden' : ''}>
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
                      className={`auth-submit-button green-button ${isLoading ? 'loading' : ''}`}
                      renderIcon={isLogin ? Login : ArrowRight}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : isLogin ? 'Log in' : 'Create account'}
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
              </Tile>
            </div>
          </Content>
        </div>
      </div>
    </Theme>
  );
};

export default AuthPage;