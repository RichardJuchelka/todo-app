import React from 'react';
import { Alert } from 'react-bootstrap';

export const Error: React.FC = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Something happened :(</Alert.Heading>
      <p>
        Please, refresh the site. If the error persists, contact our support.
      </p>
    </Alert>
  );
}
