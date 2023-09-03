import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminActions from './AdminActions';

describe('AdminActions', () => {
  it('should toggle the admin section when the button is clicked', () => {
    render(<AdminActions />);
    
    // Initially, the admin section should not be visible
    expect(screen.queryByText('This is the admin section')).toBeNull();
    
    // Click the "Expand Admin Section" button
    fireEvent.click(screen.getByText('Expand Admin Section'));
    
    // Now, the admin section should be visible
    expect(screen.getByText('This is the admin section')).toBeTruthy();
    
    // Click the "Collapse Admin Section" button
    fireEvent.click(screen.getByText('Collapse Admin Section'));
    
    // The admin section should be hidden again
    expect(screen.queryByText('This is the admin section')).toBeNull();
  });
});
