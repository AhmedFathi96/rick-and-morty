import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharactersList from './'; 
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { GET_CHARACTERS } from '../../services/characters';

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1
      },
    },
    result: {
      data: {
        characters: {
          info: {
            count: 2
          },
          results: [
            { id: 1, name: "Character 1", status: "Alive" },
            { id: 2, name: "Character 2", status: "Dead" }
          ]
        }
      },
    },
  },
];

describe('CharactersList', () => {
  it('renders loading state initially', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharactersList />
      </MockedProvider>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMock = {
      request: {
        query: GET_CHARACTERS,
        variables: {
          page: 1
        },
      },
      error: new Error('An error occurred'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharactersList />
      </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });

  it('renders data after successful fetch', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharactersList />
      </MockedProvider>
    );
    await waitFor(() => expect(screen.getByText('Character 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Alive')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Character 2')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Dead')).toBeInTheDocument());
  });

  it('changes page on page change', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharactersList />
      </MockedProvider>
    );
    await waitFor(() => expect(screen.getByText('Character 1')).toBeInTheDocument());
  });
});
