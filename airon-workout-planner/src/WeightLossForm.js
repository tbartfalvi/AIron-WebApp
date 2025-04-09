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
    startDate: new Date(),
    currentWeight: '',
    targetWeight: '',
    weightUnit: 'lb',
    intensityLevel: 'intermediate',
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
            
            <Column lg={8} md={4} sm={4}></Column>
            
            <Column lg={16} md={8} sm={4}>
              <div className="form-input">
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
                placeholder="Describe your weight loss goals (e.g., 'Lose 20 pounds for summer', 'Fit into my old clothes', etc.)"
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

export default WeightLossForm;