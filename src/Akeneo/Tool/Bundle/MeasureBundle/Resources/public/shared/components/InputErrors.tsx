import React from 'react';
import styled from 'styled-components';
import {ValidationError} from '@akeneo-pim-community/shared';

const Container = styled.div`
  .AknFieldContainer-validationError {
    background-size: 20px;
  }
`;

type InputErrorsProps = {
  errors?: ValidationError[];
};

const InputErrors = ({errors = []}: InputErrorsProps) => {
  if (0 === errors.length) return null;

  return (
    <Container className="AknFieldContainer-footer AknFieldContainer-validationErrors">
      {errors.map((error: ValidationError, key: number) => (
        <span className="AknFieldContainer-validationError error-message" key={key}>
          {error.message}
        </span>
      ))}
    </Container>
  );
};

export {InputErrors};
