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

const WeightLossForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    programName: 'My Weight Loss Program',
    startDate: new Date(),
    age: '',
    programWeeks: 8,
    currentWeight: '',
    targetWeight: '',
    weightUnit: 'lb',
    intensityLevel: 'intermediate',
    gender: 'male',
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
        <h2 className="form-title">Create Weight Loss Program</h2>
        <p className="form-description">
          Build a personalized weight loss program focused on sustainable fat loss through a combination of exercise and nutrition guidance.
        </p>

        <Form onSubmit={handleSubmit}>
          <Grid>
            {/* Program Name */}
            <Column lg={16} md={8} sm={4}>
              <div className="form-section">
                <TextInput
                  id="programName"
                  labelText="Program Name"
                  placeholder="Enter a name for your program"
                  value={formData.programName}
                  onChange={e => handleChange('programName', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </Column>
            
            {/* Basic Info - 3 Column Layout */}
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
            
            {/* Gender Selection */}
            <Column lg={8} md={4} sm={4}>
              <div className="button-group-section">
                <p className="input-label">Gender:</p>
                <ButtonSet>
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
            
            {/* Intensity Level */}
            <Column lg={8} md={4} sm={4}>
              <div className="button-group-section">
                <p className="input-label">Intensity Level:</p>
                <ButtonSet>
                  <Button
                    kind={formData.intensityLevel === 'easy' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('intensityLevel', 'easy')}
                    style={formData.intensityLevel === 'easy' ? greenButtonStyle : {}}
                  >
                    Easy
                  </Button>
                  <Button
                    kind={formData.intensityLevel === 'intermediate' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('intensityLevel', 'intermediate')}
                    style={formData.intensityLevel === 'intermediate' ? greenButtonStyle : {}}
                  >
                    Intermediate
                  </Button>
                  <Button
                    kind={formData.intensityLevel === 'hard' ? 'primary' : 'tertiary'}
                    onClick={() => handleChange('intensityLevel', 'hard')}
                    style={formData.intensityLevel === 'hard' ? greenButtonStyle : {}}
                  >
                    Hard
                  </Button>
                </ButtonSet>
              </div>
            </Column>

            {/* Weights - 2 Columns */}
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
              <NumberInput
                id="targetWeight"
                label="Target Weight"
                min={1}
                value={formData.targetWeight}
                onChange={e => handleChange('targetWeight', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>

            {/* Weight Unit */}
            <Column lg={16} md={8} sm={4}>
              <div className="form-section">
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
            <Column lg={16} md={8} sm={4}>
              <div className="form-section">
                <TextArea
                  id="goals"
                  labelText="Goals"
                  placeholder="Describe your weight loss goals (e.g., 'Lose 20 pounds for summer', 'Fit into my old clothes', etc.)"
                  rows={4}
                  value={formData.goals}
                  onChange={e => handleChange('goals', e.target.value)}
                  className="form-input"
                />
              </div>
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

export default WeightLossForm;