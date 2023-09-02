import { renderHook, act } from '@testing-library/react';
import useFirebaseDocument from './useFirebaseDocument';
import { getDocs } from 'firebase/firestore';
import MockDate from 'mockdate';

jest.mock('../firebase/firebaseConfig', () => ({
  db: jest.fn(),
}));



jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  getDocs: jest.fn(),
}));

const setupHook = async (mockData, initialProps = {}) => {
  getDocs.mockResolvedValueOnce(mockData);
  let wrapper;
  await act(async () => {
    wrapper = renderHook(({ collectionBase, language }) => useFirebaseDocument(collectionBase, language), {
      initialProps: { collectionBase: 'about', language: 'en', ...initialProps },
    });
  });
  return wrapper;
};

describe('useFirebaseDocument', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    MockDate.set('2022-11-20');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('should set loading to true initially', async () => {
    const mockData = { empty: true };
    // Delay the promise resolution so we can check the initial loading state
    getDocs.mockResolvedValueOnce(new Promise(resolve => setTimeout(() => resolve(mockData), 100)));
    
    let wrapper;
    
    await act(async () => {
      wrapper = renderHook(() => useFirebaseDocument('about', 'en'));
    });
    
    const { result } = wrapper;
    expect(result.current[1]).toBe(true);  // Check initial loading state
  });

  it('should fetch most recent document', async () => {
    const mockData = { title: 'Hello', subtitle: 'World' };
    const mockDocs = [{ data: () => mockData }];
    const mockSnapshot = { empty: false, docs: mockDocs };
  
    const { result } = await setupHook(mockSnapshot);
  
    expect(result.current[0]).toEqual(mockData);
    expect(result.current[1]).toBe(false);
  });

  it('should return null if no documents are found', async () => {
    const mockSnapshot = { empty: true };
    
    const { result } = await setupHook(mockSnapshot);
    
    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe(false);
  });
  
  it('should update when language or collection changes', async () => {
    const firstMockData = { title: 'Hello', subtitle: 'World' };
    const secondMockData = { title: 'Hola', subtitle: 'Mundo' };
    const mockDocs1 = [{ data: () => firstMockData }];
    const mockDocs2 = [{ data: () => secondMockData }];
  
    getDocs.mockResolvedValueOnce({ empty: false, docs: mockDocs1 });
    getDocs.mockResolvedValueOnce({ empty: false, docs: mockDocs2 });
    
    const { result, rerender } = await setupHook({ empty: false, docs: mockDocs1 }, { collectionBase: 'about', language: 'en' });
    expect(result.current[0]).toEqual(firstMockData);
  
    await act(async () => {
      rerender({ collectionBase: 'about', language: 'es' });
    });
  
    expect(result.current[0]).toEqual(secondMockData);
  });

  it('should handle errors gracefully', async () => {
    const errorMsg = 'Some error';
    getDocs.mockRejectedValueOnce(new Error(errorMsg));
  
    const { result } = await setupHook(null, { collectionBase: 'aboutzdfghsfdhtf', language: 'en' });
    expect(result.current[0]).toBeNull();  // Data should be null
    expect(result.current[1]).toBe(false);  // Loading should be false
    expect(result.current[2]).toBe(errorMsg);  // Error should be set to 'Some error'
  });
  
});
