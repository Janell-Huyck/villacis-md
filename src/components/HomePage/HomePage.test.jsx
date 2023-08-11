import React from 'react';
import HomePage from './HomePage';
import withLanguage from '../../hocs/withLanguage';
import { render } from '../../utils/test-utils';

const WrappedHomePage = withLanguage(HomePage, 'HomePage');

describe('HomePage', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<WrappedHomePage />, { language: 'en' });
    expect(getByText('Health Connections Direct Primary Care')).toBeInTheDocument();
  });

  it('renders the services list correctly', () => {
    const { getAllByRole } = render(<WrappedHomePage />, { language: 'en' });
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(5); // 5 is the number of items in the servicesList
    expect(listItems[0]).toHaveTextContent('Routine check-ups');
    expect(listItems[1]).toHaveTextContent('Basic lab tests');
  });

  it('renders the Spanish title correctly', () => {
    const { getByText } = render(<WrappedHomePage />, { language: 'es' });
    expect(getByText('Health Connections Direct Primary Care')).toBeInTheDocument();
  });

  it('renders the Spanish services list correctly', () => {
    const { getAllByRole } = render(<WrappedHomePage />, { language: 'es' });
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(5); // 5 is the number of items in the servicesList
    
    expect(listItems[0]).toHaveTextContent('Chequeos de rutina');
    expect(listItems[1]).toHaveTextContent('Pruebas de laboratorio básicas');
  });
});
