import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
	query GetLocations($page: Int!) {
		locations(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				type
				dimension
				residents{
				  id
				  name
				}
			}
		}
	}
`;


export const GET_LOCATION_BY_ID = gql`
	query GetLocation($id: ID!) {
		location(id: $id) {
			id
			name
			type
			dimension
			residents {
				id
				name
			}
		}
	}
`;
