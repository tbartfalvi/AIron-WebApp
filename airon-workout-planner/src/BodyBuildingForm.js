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

const BodyBuildingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    age: '',
    programWeeks: 8,
    currentWeight: '',
    weightUnit: 'lb',
    experienceLevel: 'intermediate',
    bodyFatPercentage: '',
    workoutsPerWeek: 4,
    timePerWorkout: 75,
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
        <h2 className="form-title">Create Bodybuilding Program</h2>
        <p className="form-description">
          Build a personalized bodybuilding program focused on muscle hypertrophy, symmetry, and aesthetics.
        </p>

        <Form onSubmit={handleSubmit}>
          <Grid>
            <Column lg={8} md={4} sm={4}>
              <DatePicker
                datePickerType="single"
                dateFormat="m/d/Y"
                onChange={handleDateChange}
                value={formData.startDate}
              >
                <DatePickerInput
                  id="startDate"
                  labelText="What date do you want to start the Program?"
                  placeholder="mm/dd/yyyy"
                  size="md"
                  className="form-input"
                  required
                />
              </DatePicker>
            </Column>
            
            <Column lg={8} md={4} sm={4}>
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
            
            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="programWeeks"
                label="Program Duration (weeks)"
                min={4}
                max={16}
                value={formData.programWeeks}
                onChange={e => handleChange('programWeeks', e.target.value)}
                className="form-input"
                required
                hideSteppers
              />
            </Column>
            
            <Column lg={16} md={8} sm={4}>
              {/* Empty space above experience level buttons */}
              <div style={{ marginBottom: '1.5rem' }}></div>
              <div className="form-input">
                <p className="input-label">Experience Level:</p>
                <ButtonSet>
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
                id="bodyFatPercentage"
                label="Estimated Body Fat Percentage (%)"
                min={1}
                max={50}
                value={formData.bodyFatPercentage}
                onChange={e => handleChange('bodyFatPercentage', e.target.value)}
                className="form-input"
                hideSteppers
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <div className="form-input">
                <p className="input-label">Do you track your weights in kilograms or pounds?</p>
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
            <Column lg={8} md={4} sm={4}></Column>
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

            <Column lg={16} md={8} sm={4}>
              <TextArea
                id="goals"
                labelText="Goals"
                placeholder="Describe your bodybuilding goals (e.g., 'Increase arm size', 'Improve chest definition', 'Prepare for competition')"
                rows={4}
                value={formData.goals}
                onChange={e => handleChange('goals', e.target.value)}
                className="form-input"
              />
            </Column>
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

export default BodyBuildingForm;