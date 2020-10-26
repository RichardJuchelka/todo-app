import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Error } from './Error';

test('Error component renders cool text', async () => {
  render(<Error />)

  expect(screen.getByText('Something happened :(')).toBeInTheDocument()
})
