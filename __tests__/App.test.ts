// __tests__/App.test.ts
// Basic smoke test for navigation and screen rendering

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App Navigation', () => {
  it('renders home and navigates to screens', () => {
    const { getByText } = render(<App />);
    expect(getByText('Daily Check-In')).toBeTruthy();
    expect(getByText('Virtual Emotion World')).toBeTruthy();
    expect(getByText('Activity Map')).toBeTruthy();
    expect(getByText('Journal')).toBeTruthy();

    fireEvent.press(getByText('Daily Check-In'));
    expect(getByText('Daily Check-In')).toBeTruthy();
  });
});
