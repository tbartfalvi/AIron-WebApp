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
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './ProgramForms.css';

const PowerliftingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    age: '',
    programWeeks: 8,
    currentWeight: '',
    weightUnit: 'lb',
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

  return (
    <div className="program-form-container">
      <Tile className="program-form-tile">
        <h2 className="form-title">Create Powerlifting Program</h2>
        <p className="form-description">
          Build a personalized powerlifting program focused on strength development in the main lifts (squat, bench press, deadlift).
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

            <Column lg={16} md={8} sm={4}>
              <p className="form-section-title">What are your 1RM's for the following lifts?</p>
            </Column>

            <Column lg={8} md={4} sm={4}>
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

            <Column lg={8} md={4} sm={4}>
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

            <Column lg={8} md={4} sm={4}>
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
                placeholder="Describe your powerlifting goals (e.g., 'Increase squat 1RM by 50 lbs', 'Qualify for state championships', etc.)"
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

export default PowerliftingForm;