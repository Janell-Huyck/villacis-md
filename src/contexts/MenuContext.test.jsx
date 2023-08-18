import React from 'react';
import { render, act } from '@testing-library/react';
import { MenuProvider, useMenuContext } from './MenuContext';

// A test component that uses the context and allows us to manipulate it
const TestComponent = () => {
  const { menuOpen, setMenuOpen } = useMenuContext();

  return (
    <div>
      <span>{menuOpen.toString()}</span>
      <button onClick={() => setMenuOpen(!menuOpen)}>Toggle Menu</button>
    </div>
  );
};

describe('MenuContext', () => {
  test('provides the default value', () => {
    const { getByText } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    // Ensure the initial state is correct
    expect(getByText('false')).toBeTruthy();
  });

  test('setMenuOpen is a function', () => {
    const { result } = renderHook(() => useMenuContext(), {
      wrapper: MenuProvider,
    });
    const { setMenuOpen } = result.current;

    expect(typeof setMenuOpen).toBe('function');
  });

  test('setMenuOpen changes the menuOpen state', () => {
    const { getByText } = render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    // Simulate clicking the button, which should call setMenuOpen
    act(() => {
      getByText('Toggle Menu').click();
    });

    // Check that the state has changed as expected
    expect(getByText('true')).toBeTruthy();
  });
});
