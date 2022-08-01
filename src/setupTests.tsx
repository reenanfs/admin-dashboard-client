// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { MockDataGrid } from 'tests/setupTestsHelper';

jest.mock('@mui/x-data-grid', () => {
  return {
    ...jest.requireActual('@mui/x-data-grid'),
    DataGrid: MockDataGrid,
  };
});
