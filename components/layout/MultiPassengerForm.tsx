import React, { useState } from 'react';
import PassengerDetailsForm from './PassengerDetailsForm';

const MultiPassengerForm: React.FC = () => {
  const [passenger1, setPassenger1] = useState({});
  const [passenger2, setPassenger2] = useState({});
  const [showSecondPassengerForm, setShowSecondPassengerForm] = useState(false);

  const handlePassenger1Submit = (data: any) => {
    setPassenger1(data);
    setShowSecondPassengerForm(true);
  };

  const handlePassenger2Submit = (data: any) => {
    setPassenger2(data);
  };

  return (
    <>
      <PassengerDetailsForm onSubmit={handlePassenger1Submit} />
      {showSecondPassengerForm && (
        <PassengerDetailsForm onSubmit={handlePassenger2Submit} />
      )}
    </>
  );
};

export default MultiPassengerForm;
