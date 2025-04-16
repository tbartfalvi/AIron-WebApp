import React, { useState, useEffect } from 'react';
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
  InlineLoading,
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
import apiService from './apiService';

const LandingPage = ({ user, onLogout }) => {
  const [selectedRows, setSelectedRows] = useState([]); // for delete modal storage
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  
  // Fetch user's programs on component mount
  useEffect(() => {
    fetchPrograms();
  }, []);
  
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const userPrograms = await apiService.getPrograms(user.id);
      // Transform the programs data to match the expected format.
      // Ensure each program has a unique string id.
      const formattedPrograms = userPrograms.map(program => ({
        id: program.id.toString(),  // convert id to string, if necessary
        name: program.name,
        dateCreated: new Date(program.created_on).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        type: getProgramTypeName(program.type)
      }));
      
      console.log("Formatted program data:", formattedPrograms);
      setPrograms(formattedPrograms);
      setError('');
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper to convert program type enum string to readable string
  const getProgramTypeName = (typeEnum) => {
    switch(typeEnum) {
      case "ScheduleType.BODY_BUILDING":
        return "Body Building";
      case "ScheduleType.POWER_LIFTING":
        return "Powerlifting";
      case "ScheduleType.WEIGHT_LOSS":
        return "Weight Loss";
      default:
        return "Unknown";
    }
  };
  
  // Map program type (from form) to enum value
  const getProgramTypeEnum = (type) => {
    switch(type) {
      case "bodybuilding":
        return 1; // BODY_BUILDING
      case "powerlifting":
        return 2; // POWER_LIFTING
      case "weightloss":
        return 3; // WEIGHT_LOSS
      default:
        return 1;
    }
  };

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

const handleDownloadProgram = async (selectedRowsFromTable) => {
    console.log('handleDownloadProgram called. Selected rows:', selectedRowsFromTable);
    try {
      if (!selectedRowsFromTable || selectedRowsFromTable.length === 0) {
        console.log("No rows selected for download");
        return;
      }
      for (const row of selectedRowsFromTable) {
        console.log('Attempting download for program id:', row.id);
        await apiService.downloadProgram(user.id, row.id);
      }
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download selected programs');
    }
  };


  const handleDeleteModalOpen = (selectedRowsFromTable) => {
    console.log('handleDeleteModalOpen called. Selected rows:', selectedRowsFromTable);
    if (!selectedRowsFromTable || selectedRowsFromTable.length === 0) {
      console.log("No rows selected for deletion");
      return;
    }
    // Save the selected rows in local state for deletion
    setSelectedRows(selectedRowsFromTable);
    setIsDeleteModalOpen(true);
  };


  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

 const handleDeleteProgram = async () => {
    console.log('handleDeleteProgram called. Selected rows:', selectedRows);
    try {
      setDeleteInProgress(true);
      
      // Process one deletion at a time rather than using Promise.all
      // This can help identify where failures happen
      for (const row of selectedRows) {
        console.log('Deleting program with id:', row.id);
        
        // Getting the raw ID from the row
        const programId = row.id;
        
        // Calling delete API with exact ID format
        const result = await apiService.deleteProgram(user.id, programId);
        console.log('Delete result for program', programId, ':', result);
        
        // Check if the result was successful
        if (result !== "True") {
          throw new Error(`Failed to delete program with id ${programId}`);
        }
      }
      
      // Refresh the programs list after deletion
      await fetchPrograms();
      setIsDeleteModalOpen(false);
      setSelectedRows([]);
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete selected programs: ' + error.message);
    } finally {
      setDeleteInProgress(false);
    }
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

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      const programType = getProgramTypeEnum(currentForm);
      const programName = `${currentForm.charAt(0).toUpperCase() + currentForm.slice(1)} Program`;
      
      const result = await apiService.createProgram(
        user.id,
        programName,
        programType,
        formData
      );
      
      if (result === "True") {
        await fetchPrograms();
        setCurrentForm(null);
      } else {
        console.error("Failed to create program");
        setError('Failed to create program');
      }
    } catch (error) {
      console.error("Error creating program:", error);
      setError('Failed to create program: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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

  // Use fetched programs if available; otherwise, an empty array.
  const programData = programs.length > 0 ? programs : [];

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
                {loading ? (
                  <div className="loading-container">
                    <InlineLoading 
                      description="Loading programs..." 
                      status="active" 
                      className="programs-loading"
                    />
                  </div>
                ) : programData.length > 0 ? (
                  <div className="programs-table-container">
                    <h2 className="programs-title">{user.name}'s Workout Programs</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    
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
                        selectedRows,
                        onInputChange,
                        onChange
                      }) => {
                        console.log("Inside DataTable render, selectedRows:", selectedRows);
                        return (
                          <TableContainer title="">
                            <TableToolbar>
                              <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction
                                  renderIcon={Download}
                                  onClick={() => handleDownloadProgram(selectedRows)}
                                >
                                  Download
                                </TableBatchAction>
                                <TableBatchAction
                                  renderIcon={TrashCan}
                                  onClick={() => handleDeleteModalOpen(selectedRows)}
                                >
                                  Delete
                                </TableBatchAction>
                              </TableBatchActions>
                              <TableToolbarContent>
                                <TableToolbarSearch
                                  persistent={true}
                                  onChange={onInputChange}
                                />
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
                                    <TableHeader {...getHeaderProps({ header })} key={header.key}>
                                      {header.header}
                                    </TableHeader>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map(row => (
                                  <TableRow {...getRowProps({ row })} key={row.id}>
                                    <TableSelectRow {...getSelectionProps({ row })} />
                                    {row.cells.map(cell => (
                                      <TableCell key={cell.id}>{cell.value}</TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        );
                      }}
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

        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          modalHeading="Delete Programs"
          primaryButtonText={deleteInProgress ? "Deleting..." : "Delete"}
          secondaryButtonText="Cancel"
          onRequestClose={handleDeleteModalClose}
          onRequestSubmit={handleDeleteProgram}
          danger
          primaryButtonDisabled={deleteInProgress}
        >
          <p className="about-text">
            Are you sure you want to delete the selected program(s)? This action cannot be undone.
          </p>
        </Modal>
      </div>
    </Theme>
  );
};

export default LandingPage;
