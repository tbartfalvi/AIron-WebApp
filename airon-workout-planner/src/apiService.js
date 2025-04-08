// src/apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiService = {
  // Auth endpoints
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login/${email}/${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async register(fullName, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(fullName)}/${encodeURIComponent(email)}/${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  async getUserInfo(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user-info/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get user info');
      }
      
      const data = await response.json();
      return JSON.parse(data.user);
    } catch (error) {
      console.error('Get user info error:', error);
      throw error;
    }
  },
  
  // Programs endpoints
  async createProgram(userId, programName, programType, programData) {
    try {
      const scheduleJson = JSON.stringify(programData);
      const encodedName = encodeURIComponent(programName);
      const encodedJson = encodeURIComponent(scheduleJson);
      
      const response = await fetch(
        `${API_BASE_URL}/schedule/${userId}/${encodedName}/${programType}/${encodedJson}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to create program');
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Create program error:', error);
      throw error;
    }
  },
  
  async getPrograms(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get programs');
      }
      
      const data = await response.json();
      return data.schedules || [];
    } catch (error) {
      console.error('Get programs error:', error);
      throw error;
    }
  },
  
  async getProgramById(userId, programId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule-get/${userId}/${programId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get program');
      }
      
      const data = await response.json();
      return JSON.parse(data.schedule);
    } catch (error) {
      console.error('Get program error:', error);
      throw error;
    }
  }
};

export default apiService;