import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '../Home';
import { MAIN_TABLE_LABEL } from '../homeConstants';

const mocks: any = [];

describe('Home', () => {
  it('renders main table label', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    const linkElement = screen.getByText(new RegExp(MAIN_TABLE_LABEL, 'i'));
    expect(linkElement).toBeInTheDocument();
  });
});
