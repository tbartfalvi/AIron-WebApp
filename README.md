## Getting Started

These instructions will help y'all set up and run the AIron Workout Planner application on your local machine after cloning the repository.

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

You can check if Node.js and npm are installed by running these commands in your terminal:

```bash
node -v
npm -v
```

### Installation

Follow these steps to get the application running:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/your-username/AIron-WebApp.git
   cd AIron-WebApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This will install all required packages defined in the package.json file.

3. **Start the development server**:
   ```bash
   npm start
   ```
   The application will open automatically in your default browser at http://localhost:3000.

### Troubleshooting

If you encounter any issues:

- **UNABLE_TO_GET_ISSUER_CERT_LOCALLY**: If running locally turn off strict ssl by running `npm config set strict-ssl false`
- **"Missing script: start" error**: Make sure you're in the correct directory and that the package.json file exists
- **Module not found errors**: Try running `npm install` again to ensure all dependencies are installed
- **Port conflicts**: If port 3000 is already in use, React will ask to use a different port

## Project Structure

```
airon-workout-planner/
├── public/              # Static files and HTML template
├── src/                 # Source code
│   ├── App.js           # Main component that handles auth state
│   ├── AuthPage.js      # Login/signup page
│   ├── LandingPage.js   # Dashboard with program list
│   ├── PowerliftingForm.js  # Form for creating powerlifting programs
│   ├── BodyBuildingForm.js  # Form for creating bodybuilding programs
│   ├── WeightLossForm.js    # Form for creating weight loss programs
│   └── *.css            # Stylesheets for components
└── package.json         # Project configuration and dependencies
```

## Features

- User authentication (login/signup)
- Dashboard with list of created workout programs
- Create personalized workout programs based on three types:
  - Powerlifting
  - Body Building
  - Weight Loss
- Each program type has customized parameters
- About modal with application information
- Modern UI with Carbon Design System components

## Technologies Used

- React.js
- Carbon Design System (@carbon/react)
- CSS
- Node.js
- npm

## Development Workflow

1. **Fetch the latest changes**:
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and test them locally**:
   ```bash
   npm start
   ```

4. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** on GitHub to merge your changes
