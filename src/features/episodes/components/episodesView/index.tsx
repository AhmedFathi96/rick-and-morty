import { useQuery } from '@apollo/client';
import styles from './styles.module.scss'
import { GET_EPISODE_BY_ID } from "../../services/episodes";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Card, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { ICharacter } from '../../../characters/types';

const EpisodeView: React.FC = () => {

	const { id } = useParams(); // Get the character ID from the URL params
    const { loading, error, data, refetch } = useQuery(
        GET_EPISODE_BY_ID, 
        {
            variables: { id },
        }
    );

    useEffect(() => {
        refetch({ id: id });
    }, [id, refetch]);
    
	if (loading) return <div style={{ height: '80vh'}}><CircularProgress data-testid="loading-spinner" sx={{margin: 'auto' ,display: 'flex', justifyContent: 'center' }}/></div>;
	if (error) return <Alert severity="error">Error: {error.message}</Alert>;

	const episode = data?.episode;


	return <div className={styles.episodeViewWrapper}>
		<Card variant="outlined" sx={{ maxWidth: 360, margin: 'auto' }}>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<ListItem>
					<ListItemText primary="Name" secondary={episode.name} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Air date" secondary={episode.air_date} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Episode" secondary={episode.episode} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Characters" secondary={episode.characters.map((obj:ICharacter) => obj.name).join(',')} />
				</ListItem>
			</List>
		</Card>
	</div>
	
}

export default EpisodeView
