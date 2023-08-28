  // AboutPage.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AboutPage from './AboutPage';
import * as hooks from '../../hooks/useFirebaseDocument';
import { LanguageContext } from '../../contexts/LanguageContext';
import { navigate } from 'gatsby'; 


jest.mock('gatsby', () => ({
  navigate: jest.fn(),
}));

jest.mock('../../hooks/useFirebaseDocument');

describe('AboutPage', () => {
  it('shows loading state', async () => {
    hooks.useFirebaseDocument.mockReturnValue([null, true]);
    render(
      <LanguageContext.Provider value={{ language: 'en' }}>
        <AboutPage />
      </LanguageContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


  it('redirects to 404 if content is missing', async () => {
    hooks.useFirebaseDocument.mockReturnValue([null, false]); // Content is missing
    render(
      <LanguageContext.Provider value={{ language: 'en' }}>
        <AboutPage />
      </LanguageContext.Provider>
    );

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/404'); // Check if navigate was called with '/404'
    });
  });


  it('renders content properly', async () => {
    const mockData = {
      title: 'About Us',
      subtitle: 'Meet the Team',
      people: [
        {
          name: 'John Doe',
          title: 'CEO',
          image: 'john.jpg',
          bio: ['Lorem ipsum', 'dolor sit amet'],
          certifications: ['Cert1', 'Cert2'],
          certificationsTitle: 'Certifications',
          memberships: ['Member1', 'Member2'],
          membershipsTitle: 'Memberships',
          education: [
            { type: 'High School', institution: 'Sample High' },
            { type: 'College', institution: 'Sample College' },
          ],
          educationTitle: 'Education',
        },
      ],
    };

    hooks.useFirebaseDocument.mockReturnValue([mockData, false]);
    
    render(
      <LanguageContext.Provider value={{ language: 'en' }}>
        <AboutPage />
      </LanguageContext.Provider>
    );

    // Check for title, subtitle and other structural elements
    await waitFor(() => {
      expect(screen.getByText(/about us/i)).toBeInTheDocument();
      expect(screen.getByText(/meet the team/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument(); // assuming the image loads
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/ceo/i)).toBeInTheDocument();
    });

    // Check for bio
    mockData.people[0].bio.forEach(paragraph => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    // Check for certifications
    expect(screen.getByText(mockData.people[0].certifications.join(', '))).toBeInTheDocument();

    // Check for memberships
    expect(screen.getByText(mockData.people[0].memberships.join(', '))).toBeInTheDocument();

    // Check for education. Here you could target the HTML structure rather than the text
    const educationListItems = screen.getAllByRole('listitem');
    expect(educationListItems).toHaveLength(2); // or however many you expect
  });
});
