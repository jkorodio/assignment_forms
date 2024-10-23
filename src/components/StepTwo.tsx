import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, Button, FormControlLabel, TextField, MenuItem } from '@mui/material';

interface StepTwoProps {
  interest: string;
  onBack: () => void;
  onSubmit: (data: StepTwoData) => void;
}

export interface StepTwoData {
  terms: boolean;
  mainInterest: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ interest, onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<StepTwoData>({
    defaultValues: {
      terms: false, 
      mainInterest: ''    
    }
  });

  const onSubmitForm = (data: StepTwoData) => {
    setIsSubmitting(true);
    onSubmit(data);
  };

  const getOptions = () => {
    switch (interest) {
      case 'Cars':
        return ['Convertible', 'Sedan', 'SUV', 'Other'];
      case 'Music':
        return ['Folk', 'Jazz', 'Punk', 'Other'];
      case 'Sport':
        return ['Baseball', 'Basketball', 'Football', 'Ice Hockey', 'Other'];
      default:
        return [];
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextField
        label={`Favorite ${interest === 'Cars' ? 'Car Type' : interest === 'Music' ? 'Music Genre' : 'Sport'}`}
        select
        {...register('mainInterest', { required: true })}
        error={!!errors.mainInterest}
        helperText={errors.mainInterest ? 'Please select your favorite' : ''}
        fullWidth
        margin="normal"
      >
        {getOptions().map(option => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={<Checkbox {...register('terms', { required: true })} />}
        label={
          <span>
          I accept the{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Terms and Conditions
          </a>
        </span>
        }
      />
      {errors.terms && <p style={{color:'#d32f2f',fontSize:'12px'}}>&emsp;Terms and conditions must be accepted</p>}<br/>
      <Button onClick={onBack} variant="outlined"disabled={isSubmitting}>Back</Button>
      <Button type="submit" variant="contained"disabled={isSubmitting}>{isSubmitting ? 'Please Wait...':'Submit'}</Button>
    </form>
  );
};

export default StepTwo;
