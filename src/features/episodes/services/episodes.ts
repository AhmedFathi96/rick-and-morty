import { gql } from '@apollo/client';

export const GET_EPISODES = gql`
	query GetEpisodes($page: Int!) {
		episodes(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				air_date
				episode
				characters {
					id
					name
				}
			}
		}
	}
`;


export const GET_EPISODE_BY_ID = gql`
	query GetEpisode($id: ID!) {
		episode(id: $id) {
			id
			name
			air_date
			episode
			characters {
				id
				name
			}
		}
	}
`;
