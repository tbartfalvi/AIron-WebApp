import React, { useState } from 'react';
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  Theme,
  Content,
  Grid,
  Column,
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableSelectRow,
  TableBatchActions,
  TableBatchAction,
  Modal,
} from '@carbon/react';
import { 
  AddFilled, 
  Information,
  Logout,
  Download,
  TrashCan,
  ChevronDown,
  Dashboard,
  Activity,
  Document,
} from '@carbon/icons-react';
import './LandingPage.css';
import PowerliftingForm from './PowerliftingForm';
import BodyBuildingForm from './BodyBuildingForm';
import WeightLossForm from './WeightLossForm';

const LandingPage = ({ user, onLogout }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  
  // Sample workout program data
  const programData = [
    {
      id: '1',
      name: 'Summer Strength Program',
      dateCreated: 'February 20, 2025',
      type: 'Powerlifting'
    },
    {
      id: '2',
      name: 'Weight Loss Circuit',
      dateCreated: 'February 25, 2025',
      type: 'Weight Loss'
    },
    {
      id: '3',
      name: 'Hypertrophy Focus',
      dateCreated: 'February 28, 2025',
      type: 'Body Building'
    }
  ];

  const handleCreateClick = () => {
    setIsCreateOpen(!isCreateOpen);
  };
  
  const handleProgramSelect = (programType) => {
    setCurrentForm(programType);
    setIsCreateOpen(false);
  };

  const handleCreateProgram = () => {
    handleCreateClick();
  };

  const handleRowSelection = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const handleDownloadProgram = () => {
    console.log('Downloading selected programs:', selectedRows);
    // In a real app, this would trigger a CSV download
  };

  const handleDeleteProgram = () => {
    console.log('Deleting selected programs:', selectedRows);
    // In a real app, this would delete the selected programs
  };

  const handleLogout = () => {
    onLogout();
  };

  const toggleAboutModal = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  const handleBackToLanding = () => {
    setCurrentForm(null);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData, 'for program type:', currentForm);
    // In a real app, you would save this data to create a program
    setCurrentForm(null);
  };

  // Render the appropriate form based on the selected program type
  const renderForm = () => {
    switch(currentForm) {
      case 'powerlifting':
        return (
          <PowerliftingForm 
            onSubmit={handleFormSubmit} 
            onCancel={handleBackToLanding} 
          />
        );
      case 'bodybuilding':
        return (
          <BodyBuildingForm 
            onSubmit={handleFormSubmit} 
            onCancel={handleBackToLanding} 
          />
        );
      case 'weightloss':
        return (
          <WeightLossForm 
            onSubmit={handleFormSubmit} 
            onCancel={handleBackToLanding} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Theme theme="g100">
      <div className="landing-container">
        <Header aria-label="AIron Workout Planner" className="landing-header">
          <HeaderName prefix="">AIron Workout Planner</HeaderName>
          
          <HeaderGlobalBar>
            <div className="create-program-wrapper">
              <HeaderGlobalAction
                aria-label="Create Program"
                onClick={handleCreateClick}
                className="create-program-button"
              >
                <span>Create a Program</span>
                <ChevronDown size={16} />
              </HeaderGlobalAction>
              
              {isCreateOpen && (
                <div className="program-dropdown">
                  <button onClick={() => handleProgramSelect('powerlifting')}>
                    <Document size={20} />
                    Powerlifting
                  </button>
                  <button onClick={() => handleProgramSelect('bodybuilding')}>
                    <Activity size={20} />
                    Body Building
                  </button>
                  <button onClick={() => handleProgramSelect('weightloss')}>
                    <Dashboard size={20} />
                    Weight Loss
                  </button>
                </div>
              )}
            </div>
            
            <HeaderGlobalAction
              aria-label="About"
              onClick={toggleAboutModal}
              className="header-button"
              tooltipAlignment="center"
            >
              <Information size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Logout"
              onClick={handleLogout}
              className="header-button"
              tooltipAlignment="center"
            >
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        
        <Content className="landing-content">
          {currentForm ? (
            renderForm()
          ) : (
            <Grid>
              <Column lg={16} md={8} sm={4}>
                {programData.length > 0 ? (
                  <div className="programs-table-container">
                    <h2 className="programs-title">{user.name}'s Workout Programs</h2>
                    
                    <DataTable 
                      rows={programData}
                      headers={[
                        { key: 'name', header: 'Program Name' },
                        { key: 'dateCreated', header: 'Date Created' },
                        { key: 'type', header: 'Program Type' }
                      ]}
                      isSortable
                      render={({
                        rows,
                        headers,
                        getHeaderProps,
                        getRowProps,
                        getSelectionProps,
                        getBatchActionProps,
                        selectedRows
                      }) => (
                        <TableContainer title="">
                          <TableToolbar>
                            <TableBatchActions {...getBatchActionProps()}>
                              <TableBatchAction
                                renderIcon={Download}
                                onClick={handleDownloadProgram}
                              >
                                Download
                              </TableBatchAction>
                              <TableBatchAction
                                renderIcon={TrashCan}
                                onClick={handleDeleteProgram}
                              >
                                Delete
                              </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                              <TableToolbarSearch />
                              <Button 
                                renderIcon={AddFilled} 
                                onClick={handleCreateProgram}
                                className="create-program-table-button"
                              >
                                Create program
                              </Button>
                            </TableToolbarContent>
                          </TableToolbar>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableSelectAll {...getSelectionProps()} />
                                {headers.map(header => (
                                  <TableHeader {...getHeaderProps({ header })}>
                                    {header.header}
                                  </TableHeader>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map(row => (
                                <TableRow {...getRowProps({ row })}>
                                  <TableSelectRow {...getSelectionProps({ row })} />
                                  {row.cells.map(cell => (
                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    />
                  </div>
                ) : (
                  <div className="empty-state">
                    <h2>Welcome to your workout planner</h2>
                    <p>Create your first workout program to get started</p>
                    <Button
                      renderIcon={AddFilled}
                      onClick={handleCreateProgram}
                      className="create-first-program"
                    >
                      Create a program
                    </Button>
                  </div>
                )}
              </Column>
            </Grid>
          )}
        </Content>

        {/* About Modal */}
        {isAboutOpen && (
          <Modal
            open={isAboutOpen}
            modalHeading="About AIron Workout Planner"
            primaryButtonText="Close"
            onRequestClose={toggleAboutModal}
            onRequestSubmit={toggleAboutModal}
            primaryButtonClass="green-modal-button"
          >
            <p className="about-text">
              AIron Workout Planner helps you achieve your fitness goals through personalized workout programs.
              <br /><br />
              © 2/2025
            </p>
          </Modal>
        )}
      </div>
    </Theme>
  );
};

export default LandingPage;