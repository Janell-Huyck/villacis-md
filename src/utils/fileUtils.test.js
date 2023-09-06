import { saveJSON } from './fileUtils';  // Adjust the import path according to your project

describe('saveJSON', () => {
  let mockCreateObjectURL, mockRevokeObjectURL, mockClick;

  beforeEach(() => {
    // Mock Blob
    global.Blob = jest.fn((content, options) => ({ content, options }));

    // Mock URL.createObjectURL and URL.revokeObjectURL
    mockCreateObjectURL = jest.fn();
    mockRevokeObjectURL = jest.fn();
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    // Mock anchor click
    mockClick = jest.fn();
    document.createElement = jest.fn(() => ({
      click: mockClick,
      set href(val) { this._href = val; },
      get href() { return this._href; },
    }));
  });

  it('should handle data being null or undefined', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    saveJSON(null);
    expect(consoleErrorSpy).toHaveBeenCalledWith('No data to save');
    
    saveJSON(undefined);
    expect(consoleErrorSpy).toHaveBeenCalledWith('No data to save');

    consoleErrorSpy.mockRestore();
  });

  it('should save data with default filename', () => {
    const data = { key: 'value' };
    saveJSON(data);

    expect(Blob).toHaveBeenCalledWith([JSON.stringify(data, null, 2)], { type: "application/json" });
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
  });

  it('should save data with custom filename', () => {
    const data = { key: 'value' };
    const filename = 'custom.json';
    saveJSON(data, filename);

    expect(Blob).toHaveBeenCalledWith([JSON.stringify(data, null, 2)], { type: "application/json" });
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
  });
});
