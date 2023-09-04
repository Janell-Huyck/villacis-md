import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminInstructions from './AdminInstructions';

describe('AdminInstructions', () => {
  it('should toggle the instructions section when the button is clicked', () => {
    render(<AdminInstructions />);
    
    // Initially, the instructions section should not be visible
    expect(screen.queryByText('Instructions')).toBeNull();
    
    // Click the "Expand Instructions" button
    fireEvent.click(screen.getByText('Expand Instructions'));
    
    // Now, the instructions section should be visible
    expect(screen.getByText('Instructions')).toBeTruthy();
    
    // Click the "Collapse Instructions" button
    fireEvent.click(screen.getByText('Collapse Instructions'));
    
    // The instructions section should be hidden again
    expect(screen.queryByText('Instructions')).toBeNull();
  });
});
