// useAllPageNames.test.js

import { renderHook } from '@testing-library/react-hooks';
import { useStaticQuery } from 'gatsby';
import useAllPageNames from './useAllPageNames';

// Mock Gatsby's useStaticQuery hook
beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    allSitePage: {
      edges: [
        { node: { path: '/about/' } },
        { node: { path: '/contact/' } },
        { node: { path: '/index/' } },
      ],
    },
  }));
});

describe('useAllPageNames', () => {
  it('should return a list of all page names', () => {
    const { result } = renderHook(() => useAllPageNames());
    expect(result.current).toEqual(['about', 'contact', 'index']);
  });
});
