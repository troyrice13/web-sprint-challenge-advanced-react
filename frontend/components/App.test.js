// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional';

describe('AppFunctional Component Tests', () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test('coordinates heading is visible', () => {
    const coordinates = screen.getByText(/Coordinates/);
    expect(coordinates).toBeVisible();
  });
  test('steps counter is visible', () => {
    const steps = screen.getByText(/You moved \d times?/i);
    expect(steps).toBeVisible();
  });

  test('buttons are visible', () => {
    expect(screen.getByText('LEFT')).toBeVisible();
    expect(screen.getByText('UP')).toBeVisible();
    expect(screen.getByText('RIGHT')).toBeVisible();
    expect(screen.getByText('DOWN')).toBeVisible();
    expect(screen.getByText('reset')).toBeVisible();
  });

  test('submit button is visible', () => {
    expect(screen.getByText('Submit')).toBeVisible();
  });

  test('typing in the email input updates its value', () => {
    const emailInput = screen.getByPlaceholderText('type email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });
});
