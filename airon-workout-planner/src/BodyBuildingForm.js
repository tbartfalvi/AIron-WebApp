import React, { useState } from 'react';
import {
  Form,
  TextInput,
  NumberInput,
  TextArea,
  Grid,
  Column,
  Button,
  Stack,
  Tile,
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
  ButtonSet,
  Dropdown,
} from '@carbon/react';
import { ArrowRight, Close } from '@carbon/icons-react';
import './ProgramForms.css';

const BodyBuildingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    currentWeight: '',
    weightUnit: 'lb', // Default to pounds
    experienceLevel: 'intermediate', // Default to intermediate
    bodyFatPercentage: '',
    workoutsPerWeek: 4,
    timePerWorkout: 75,
    trainingPreference: 'bodyPart', // Default to body part split
    muscleEmphasis: [], // Areas to emphasize
    goals: '',
  });

  // Training split options
  const trainingSplitOptions = [
    { id: 'bodyPart', text: 'Body Part Split' },
    { id: 'pushPull', text: 'Push/Pull/Legs' },
    { id: 'upperLower', text: 'Upper/Lower' },
    { id: 'fullBody', text: 'Full Body' },
    { id: 'arnold', text: 'Arnold Split' },
  ];

  // Muscle group emphasis options
  const muscleGroupOptions = [
    { id: 'chest', text: 'Chest' },
    { id: 'back', text: 'Back' },
    { id: 'shoulders', text: 'Shoulders' },
    { id: 'arms', text: 'Arms' },
    { id: 'legs', text: 'Legs' },
    { id: 'core', text: 'Core' },
  ];

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

  // Handle muscle group selection changes
  const handleMuscleChange = (selectedItems) => {
    setFormData({
      ...formData,
      muscleEmphasis: selectedItems.selectedItems,
    });
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
            
            <Column lg={8} md={4} sm={4}></Column>
            
            <Column lg={16} md={8} sm={4}>
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
                onChange={e => handleChange('workoutsPerWeek', parseInt(e.target.value))}
                className="form-input"
                required
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
                onChange={e => handleChange('timePerWorkout', parseInt(e.target.value))}
                className="form-input"
                required
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Dropdown
                id="trainingSplit"
                titleText="Preferred Training Split"
                label="Select a training split"
                items={trainingSplitOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItem }) => 
                  handleChange('trainingPreference', selectedItem.id)
                }
                initialSelectedItem={
                  trainingSplitOptions.find(
                    (option) => option.id === formData.trainingPreference
                  )
                }
                className="form-input"
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Dropdown
                id="muscleEmphasis"
                titleText="Muscle Groups to Emphasize"
                label="Select muscle groups"
                items={muscleGroupOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={handleMuscleChange}
                selectedItem={
                  formData.muscleEmphasis.length > 0 ? formData.muscleEmphasis[0] : null
                }
                type="multiselect"
                className="form-input"
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