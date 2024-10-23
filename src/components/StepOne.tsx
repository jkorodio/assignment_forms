import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from '@mui/material';

export interface StepOneData {
  email: string;
  firstName: string;
  lastName: string;
  interest: string;
}

interface StepOneProps {
  onNext: (data: StepOneData) => void;
  defaultValues: StepOneData;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<StepOneData>({
    defaultValues
  });

  const onSubmit = (data: StepOneData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        {...register('email', { 
          required: 'Email is required', 
          pattern: { 
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Please enter a valid email' 
          } 
        })}
        error={!!errors.email}
        helperText={errors.email?.message || ''}
        fullWidth
      />
      <TextField
        label="First Name"
        {...register('firstName', { required: 'First name is required' })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message || ''}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        {...register('lastName', { required: 'Last name is required' })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message || ''}
        fullWidth
        margin="normal"
      />
      <FormControl component="fieldset" error={Boolean(errors.interest)}>
        <FormLabel component="legend">Interest</FormLabel>
        <RadioGroup row defaultValue={defaultValues.interest}>
          <FormControlLabel value="Cars" control={<Radio {...register('interest', { required: 'Please select an interest' })} />} label="Cars" />
          <FormControlLabel value="Music" control={<Radio {...register('interest', { required: 'Please select an interest' })} />} label="Music" />
          <FormControlLabel value="Sport" control={<Radio {...register('interest', { required: 'Please select an interest' })} />} label="Sport" />
        </RadioGroup>
        {errors.interest && <p style={{ color: '#d32f2f', fontSize: '12px' }}>&emsp;{errors.interest.message}</p>}
      </FormControl><br/><br/>
      <Button type="submit" variant="contained">Next</Button>
    </form>
  );
};

export default StepOne;
