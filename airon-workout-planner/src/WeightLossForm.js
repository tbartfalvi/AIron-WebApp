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
} from '@carbon/react';
import { ArrowRight, Close } from '@carbon/icons-react';
import './ProgramForms.css';

const WeightLossForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    currentWeight: '',
    workoutsPerWeek: 5,
    timePerWorkout: 45,
    goals: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="program-form-container">
      <Tile className="program-form-tile">
        <h2 className="form-title">Create Weight Loss Program</h2>
        <p className="form-description">
          Build a personalized weight loss program focused on fat loss, conditioning, and sustainable fitness habits.
        </p>

        <Form onSubmit={handleSubmit}>
          <Grid>
            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="currentWeight"
                label="Current Weight (lbs)"
                min={1}
                value={formData.currentWeight}
                onChange={e => handleChange('currentWeight', e.target.value)}
                className="form-input"
                required
              />
            </Column>

            <Column lg={8} md={4} sm={4}>
              <NumberInput
                id="workoutsPerWeek"
                label="Workouts Per Week"
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
                label="Minutes Per Workout"
                min={15}
                max={240}
                step={15}
                value={formData.timePerWorkout}
                onChange={e => handleChange('timePerWorkout', parseInt(e.target.value))}
                className="form-input"
                required
              />
            </Column>

            <Column lg={16} md={8} sm={4}>
              <TextArea
                id="goals"
                labelText="Goals"
                placeholder="Describe your weight loss goals (e.g., 'Lose 20 lbs in 3 months', 'Improve cardiovascular health', 'Fit into old clothes')"
                rows={4}
                value={formData.goals}
                onChange={e => handleChange('goals', e.target.value)}
                className="form-input"
              />
            </Column>

            <Column lg={16} md={8} sm={4} className="form-buttons">
              <Stack orientation="horizontal" gap={6}>
                <Button
                  kind="secondary"
                  onClick={onCancel}
                  renderIcon={Close}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="create-program-form-button"
                  renderIcon={ArrowRight}
                >
                  Create program
                </Button>
              </Stack>
            </Column>
          </Grid>
        </Form>
      </Tile>
    </div>
  );
};

export default WeightLossForm;