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
        method: 'GET',
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
        method: 'GET',
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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to get program');
      }
      
      const data = await response.json();
      // data.schedule is already an object, so return it directly.
      return data.schedule;
    } catch (error) {
      console.error('Get program error:', error);
      throw error;
    }
  },

  async downloadProgram(userId, programId) {
    try {
      // Hit the new backend endpoint that streams the CSV file
      const response = await fetch(
        `${API_BASE_URL}/schedule-download/${userId}/${programId}`,
        { method: 'GET' }
      );
  
      if (!response.ok) {
        throw new Error('Failed to download program');
      }
  
      // The response body *is* the CSV, so read it as a Blob
      const blob = await response.blob();
  
      // Extract filename from the Content‑Disposition header, if present
      const cdHeader  = response.headers.get('Content-Disposition') || '';
      const matchName = cdHeader.match(/filename="?([^"]+)"?/);
      const filename  = matchName
        ? matchName[1]
        : `workout_program_${new Date().toISOString().split('T')[0]}.csv`;
  
      // Create a temporary link to trigger the browser download
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href        = url;
      link.download    = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);   // tidy up
    } catch (error) {
      console.error('Download program error:', error);
      throw error;
    }
  },

  async deleteProgram(userId, programId) {
    try {
      console.log("apiService.js: calling schedule_delete api endpoint");
      const response = await fetch(`${API_BASE_URL}/schedule-delete/${userId}/${programId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('apiService.js: Failed to delete program');
      }
      else {
        console.log("apiService.js: successfully called schedule-delete api endpoint.");
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('apiService.js: Delete program error:', error);
      throw error;
    }
  },
};


export default apiService;
