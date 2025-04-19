import React, { useState } from 'react';
import {
  Form,
  TextInput,
  NumberInput,
  TextArea,
  Grid,
  Column,
  Button,
  Tile,
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
  ButtonSet,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './ProgramForms.css';

const PowerliftingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    programName: 'My Powerlifting Program',
    startDate: new Date(),
    age: '',
    programWeeks: 8,
    currentWeight: '',
    weightUnit: 'lb',
    experienceLevel: 'intermediate',
    gender: 'male',
    benchPress1RM: '',
    squat1RM: '',
    deadlift1RM: '',
    workoutsPerWeek: 3,
    timePerWorkout: 60,
    goals: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (dates) => {
    const [date] = dates;
    setFormData({
      ...formData,
      startDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Custom style for green buttons
  const greenButtonStyle = {
    backgroundColor: '#0e8a00',
    borderColor: '#0e8a00',
  };

  return (
    <div className="program-form-container">
      <Tile className="program-form-tile">
        <h2 className="form-title">Create Powerlifting Program</h2>
        <p className="form-description">
          Build a personalized powerlifting program focused on strength development in the main lifts (squat, bench press, deadlift).
        </p>

        <Form onSubmit={handleSubmit}>
          <Grid>
            {/* Program Name - Full Width */}
            <Column lg={16} md={8} sm={4} className="form-column-center">
              <TextInput
                id="programName"
                labelText="Program Name"
                placeholder="Enter a name for your program"
                value={formData.programName}
                onChange={e => handleChange('programName', e.target.value)}
                className="form-input"
                required
              />
            </Column>
            
            {/* 3 Column Layout for Date, Age, Duration */}
            <Column lg={5} md={4} sm={4}>
              <DatePicker
                datePickerType="single"
                dateFormat="m/d/Y"
                onChange={handleDateChange}
                value={formData.startDate}
              >
                <DatePickerInput
                  id="startDate"
                  labelText="Start Date"
                  placeholder="mm/dd/yyyy"
                  size="md"
                  className="form-input"
                  required
                />
              </DatePicker>
            </Column>

            <Column lg={5} md={4} sm={4}>
              <NumberInput
                id="age"
                label="Age"
                min={16}
                max={99}
                value={formData.age}
                onChange={e => handleChange('age', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            <Column lg={6} md={4} sm={4}>
              <NumberInput
                id="programWeeks"
                label="Program Duration (weeks)"
                min={4}
                max={12}
                value={formData.programWeeks}
                onChange={e => handleChange('programWeeks', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>
            
            {/* Gender Selection - Centered */}
            <Column lg={16} md={8} sm={4} className="form-column-center">
              <div className="form-input" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <p className="input-label">Gender:</p>
                <ButtonSet style={{ justifyContent: 'center' }}>
                  <Button
                    kind={formData.gender === 'male' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('gender', 'male')}
                    style={formData.gender === 'male' ? greenButtonStyle : {}}
                  >
                    Male
                  </Button>
                  <Button
                    kind={formData.gender === 'female' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('gender', 'female')}
                    style={formData.gender === 'female' ? greenButtonStyle : {}}
                  >
                    Female
                  </Button>
                </ButtonSet>
              </div>
            </Column>
            
            {/* Experience Level - Centered */}
            <Column lg={16} md={8} sm={4} className="form-column-center">
              <div className="form-input" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p className="input-label">Experience Level:</p>
                <ButtonSet style={{ justifyContent: 'center' }}>
                  <Button
                    kind={formData.experienceLevel === 'beginner' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('experienceLevel', 'beginner')}
                    style={formData.experienceLevel === 'beginner' ? greenButtonStyle : {}}
                  >
                    Beginner
                  </Button>
                  <Button
                    kind={formData.experienceLevel === 'intermediate' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('experienceLevel', 'intermediate')}
                    style={formData.experienceLevel === 'intermediate' ? greenButtonStyle : {}}
                  >
                    Intermediate
                  </Button>
                  <Button
                    kind={formData.experienceLevel === 'advanced' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('experienceLevel', 'advanced')}
                    style={formData.experienceLevel === 'advanced' ? greenButtonStyle : {}}
                  >
                    Advanced
                  </Button>
                </ButtonSet>
              </div>
            </Column>

            {/* Current Weight and Weight Units - 2 Columns */}
            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="currentWeight"
                label="Current Weight"
                min={1}
                value={formData.currentWeight}
                onChange={e => handleChange('currentWeight', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <div className="form-input">
                <p className="input-label">Weight Unit:</p>
                <RadioButtonGroup
                  name="weightUnit"
                  valueSelected={formData.weightUnit}
                  onChange={value => handleChange('weightUnit', value)}
                  orientation="horizontal"
                >
                  <RadioButton
                    id="kg"
                    labelText="Kilograms (kg)"
                    value="kg"
                  />
                  <RadioButton
                    id="lb"
                    labelText="Pounds (lb)"
                    value="lb"
                  />
                </RadioButtonGroup>
              </div>
            </Column>

            {/* 1RM Section Header - Centered */}
            <Column lg={16} md={8} sm={4} className="form-column-center">
              <p className="form-section-title">What are your 1RM's for the following lifts?</p>
            </Column>

            {/* 1RM Fields - 3 Columns */}
            <Column lg={5} md={4} sm={4}>
              <NumberInput
                id="benchPress1RM"
                label="Bench Press"
                min={1}
                value={formData.benchPress1RM}
                onChange={e => handleChange('benchPress1RM', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            <Column lg={5} md={4} sm={4}>
              <NumberInput
                id="squat1RM"
                label="Squat"
                min={1}
                value={formData.squat1RM}
                onChange={e => handleChange('squat1RM', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            <Column lg={6} md={4} sm={4}>
              <NumberInput
                id="deadlift1RM"
                label="Deadlift"
                min={1}
                value={formData.deadlift1RM}
                onChange={e => handleChange('deadlift1RM', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>
            
            {/* Workout Frequency and Duration - 2 Columns */}
            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="workoutsPerWeek"
                label="Frequency Per Week"
                min={1}
                max={7}
                value={formData.workoutsPerWeek}
                onChange={e => handleChange('workoutsPerWeek', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="timePerWorkout"
                label="Time in Gym Per Workout (minutes)"
                min={15}
                max={240}
                step={15}
                value={formData.timePerWorkout}
                onChange={e => handleChange('timePerWorkout', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            {/* Goals - Full Width */}
            <Column lg={16} md={8} sm={4} className="form-column-center">
              <TextArea
                id="goals"
                labelText="Goals"
                placeholder="Describe your powerlifting goals (e.g., 'Increase squat 1RM by 50 lbs', 'Qualify for state championships', etc.)"
                rows={4}
                value={formData.goals}
                onChange={e => handleChange('goals', e.target.value)}
                className="form-input"
              />
            </Column>

            {/* Buttons - Full Width */}
            <Column lg={16} md={8} sm={4} className="form-buttons">
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button
                  kind="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="create-program-form-button"
                  renderIcon={ArrowRight}
                  style={{ marginLeft: '1rem' }}
                >
                  Create program
                </Button>
              </div>
            </Column>
          </Grid>
        </Form>
      </Tile>
    </div>
  );
};

export default PowerliftingForm;