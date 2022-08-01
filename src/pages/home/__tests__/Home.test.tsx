import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import Home from '../Home';
import { MAIN_TABLE_LABEL } from '../homeConstants';
import { ITasksData } from 'types/homeTypes.ts';
import { IMockData } from 'types/testTypes';
import { GET_TASKS } from '../homeQueries';
import { tasksData } from 'tests/mockData';

const mocks: IMockData<ITasksData>[] = [
  {
    request: {
      query: GET_TASKS,
      variables: {
        input: {
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    },
    result: {
      data: tasksData,
    },
  },
];

describe('Home', () => {
  describe('Main Label', () => {
    it('renders main table label', () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );
      const labelElement = screen.getByText(new RegExp(MAIN_TABLE_LABEL, 'i'));
      expect(labelElement).toBeInTheDocument();
    });
  });

  describe('Search bar', () => {
    it('filter rows when writing on search bar', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(await screen.findByText(/Task2/i)).toBeInTheDocument();

      const searchBar = screen.getByPlaceholderText(/Search.../i);
      userEvent.type(searchBar, 'Task1');

      await waitForElementToBeRemoved(() => screen.queryByText(/Task2/i));

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task2/i)).not.toBeInTheDocument();
    });
  });

  describe('Rows', () => {
    it('renders mocked rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
    });
  });

  describe('Delete Many Items Button', () => {
    it('renders delete many items button when clicking select all rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();

      expect(screen.getByText(/Delete/i)).not.toBeVisible();

      userEvent.click(
        screen.getByRole('checkbox', { name: 'Select all rows' })
      );

      expect(screen.getByText(/Delete/i)).toBeVisible();
    });

    it('renders delete many items button when clicking individual rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();

      expect(screen.getByText(/Delete/i)).not.toBeVisible();

      const firstRowCheckbox = screen.getAllByRole('checkbox', {
        name: 'Select row',
      })[0];

      userEvent.click(firstRowCheckbox);

      expect(screen.getByText(/Delete/i)).toBeVisible();
    });
  });

  describe('Pagination', () => {
    it('successfully goes to second page clicking on next', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

      await waitFor(() =>
        expect(screen.queryByText(/Task1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/Task11/i)).toBeInTheDocument();
    });

    it('successfully goes to second page clicking on page 2', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 2/i }));

      await waitFor(() =>
        expect(screen.queryByText(/Task1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/Task11/i)).toBeInTheDocument();
    });

    it('successfully goes back to first page when clicking on previous', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

      await waitFor(() =>
        expect(screen.queryByText(/Task1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/Task11/i)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole('button', { name: 'Go to previous page' })
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();
    });

    it('successfully goes back to first page when clicking on page 1', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 2/i }));

      await waitFor(() =>
        expect(screen.queryByText(/Task1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/Task11/i)).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 1/i }));

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();
    });

    it('changes pagination total number (20)', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();

      expect(screen.queryByText(/Task11/i)).not.toBeInTheDocument();

      const paginationSelector = screen.getByText(/^10$/i);

      userEvent.click(paginationSelector);

      const option20 = await screen.findByText(/^20$/i);

      userEvent.click(option20);

      expect(await screen.findByText(/Task1$/i)).toBeInTheDocument();
      expect(screen.getByText(/Task11/i)).toBeInTheDocument();
    });
  });
});
