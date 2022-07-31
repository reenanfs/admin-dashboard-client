import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '../Home';
import { MAIN_TABLE_LABEL } from '../homeConstants';
import { ITasksData } from 'types/homeTypes.ts';
import { mockData } from 'types/testTypes';
import { GET_TASKS } from '../homeQueries';
import { tasksData } from 'tests/mockData';

const mocks: mockData<ITasksData>[] = [
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
  it('renders main table label', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    const labelElement = screen.getByText(new RegExp(MAIN_TABLE_LABEL, 'i'));
    expect(labelElement).toBeInTheDocument();
  });

  it('renders mocked rows', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText(/Task1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Task2/i)).toBeInTheDocument();
  });

  it('renders delete many items button and change visibility', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText(/Task1/i)).toBeInTheDocument();

    expect(screen.getByText(/Delete/i)).not.toBeVisible();

    fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }));

    expect(screen.getByText(/Delete/i)).toBeVisible();
  });
});
