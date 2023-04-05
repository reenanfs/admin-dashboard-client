import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import People from '../People';
import { MAIN_TABLE_LABEL } from '../peopleConstants';
import { IMockData } from 'types/testTypes';
import { peopleData } from 'tests/mockData';
import { GET_USERS } from 'graphql/queries/peopleQueries';
import { IPeopleData } from 'types/peopleTypes';

const mocks: IMockData<IPeopleData>[] = [
  {
    request: {
      query: GET_USERS,
      variables: {
        input: {
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    },
    result: {
      data: peopleData,
    },
  },
];

describe('People', () => {
  describe('Main Label', () => {
    it('renders main table label', () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
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
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(await screen.findByText(/User2/i)).toBeInTheDocument();

      const searchBar = screen.getByPlaceholderText(/Search.../i);
      userEvent.type(searchBar, 'User1');

      await waitForElementToBeRemoved(() => screen.queryByText(/User2/i));

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User2/i)).not.toBeInTheDocument();
    });
  });

  describe('Rows', () => {
    it('renders mocked rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
    });
  });

  describe('Delete Many Items Button', () => {
    it('renders delete many items button when clicking select all rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();

      expect(screen.getByText(/Delete/i)).not.toBeVisible();

      userEvent.click(
        screen.getByRole('checkbox', { name: 'Select all rows' })
      );

      expect(screen.getByText(/Delete/i)).toBeVisible();
    });

    it('renders delete many items button when clicking individual rows', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();

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
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

      await waitFor(() =>
        expect(screen.queryByText(/User1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/User11/i)).toBeInTheDocument();
    });

    it('successfully goes to second page clicking on page 2', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 2/i }));

      await waitFor(() =>
        expect(screen.queryByText(/User1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/User11/i)).toBeInTheDocument();
    });

    it('successfully goes back to first page when clicking on previous', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

      await waitFor(() =>
        expect(screen.queryByText(/User1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/User11/i)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole('button', { name: 'Go to previous page' })
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();
    });

    it('successfully goes back to first page when clicking on page 1', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 2/i }));

      await waitFor(() =>
        expect(screen.queryByText(/User1$/i)).not.toBeInTheDocument()
      );
      expect(screen.getByText(/User11/i)).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /page 1/i }));

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();
    });

    it('changes pagination total number (20)', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <People />
        </MockedProvider>
      );

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();

      expect(screen.queryByText(/User11/i)).not.toBeInTheDocument();

      const paginationSelector = screen.getByText(/^10$/i);

      userEvent.click(paginationSelector);

      const option20 = await screen.findByText(/^20$/i);

      userEvent.click(option20);

      expect(await screen.findByText(/User1$/i)).toBeInTheDocument();
      expect(screen.getByText(/User11/i)).toBeInTheDocument();
    });
  });
});
