import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UpdatePageButton from './UpdatePageButton';  // Adjust import based on your file structure
import { saveJSON } from '../../utils/fileUtils';  // Adjust import based on your file structure

// Mock the saveJSON function
jest.mock('../../utils/fileUtils', () => ({
  saveJSON: jest.fn(),
}));

describe('<UpdatePageButton />', () => {
  it('calls saveJSON with correct arguments when clicked', () => {
    const mockData = { key: 'value' };
    
    const { getByText } = render(<UpdatePageButton data={mockData} />);
    
    fireEvent.click(getByText('Save as JSON'));

    expect(saveJSON).toHaveBeenCalledWith(mockData, "mostRecentDoc.json");
  });
});
