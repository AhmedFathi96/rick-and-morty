import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_CHARACTER_BY_ID } from '../../services/characters';
import CharacterView from '.';
import { GraphQLError } from 'graphql';

describe('CharacterView', () => {
  const mockCharacter = {
    id: '1',
    name: 'Test Character',
    species: 'Test Species',
    origin: { name: 'Test Origin' },
    location: { name: 'Test Location' },
  };

  const mocks = [
    {
      request: {
        query: GET_CHARACTER_BY_ID,
        variables: { id: '1' },
      },
      result: {
        data: { character: mockCharacter },
      },
    },
  ];

  test('renders loading spinner when loading is true', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterView />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders error message when error is not null', () => {
    const mockError = new Error('Test Error');
    const mocksWithError: MockedResponse<any>[] = [
      {
        request: {
          query: GET_CHARACTER_BY_ID,
          variables: { id: '1' },
        },
        result: {
            data: null,
            errors: [new GraphQLError('something went wrong')],
        },
      },
    ];

    render(
      <MockedProvider mocks={mocksWithError} addTypename={false}>
        <CharacterView />
      </MockedProvider>
    );

    expect(screen.getByText('Error: Test Error')).toBeInTheDocument();
  });

  test('renders character information correctly when data is not null', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterView />
      </MockedProvider>
    );

    expect(screen.getByText('Name: Test Character')).toBeInTheDocument();
    expect(screen.getByText('Species: Test Species')).toBeInTheDocument();
    expect(screen.getByText('Origin: Test Origin')).toBeInTheDocument();
    expect(screen.getByText('Location: Test Location')).toBeInTheDocument();
  });
});
