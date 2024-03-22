import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
	query GetCharacters($page: Int!) {
		characters(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				species
				origin {
					id
					name
				}
				location {
					id
					name
				}
			}
		}
	}
`;


export const GET_CHARACTER_BY_ID = gql`
	query GetCharacter($id: ID!) {
		character(id: $id) {
			id
			name
			species
			origin {
				id
				name
			}
			location {
				id
				name
			}
		}
	}
`;
