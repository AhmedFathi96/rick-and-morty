import { useQuery } from '@apollo/client';
import styles from './styles.module.scss'
import { GET_CHARACTER_BY_ID } from "../../services/characters";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Card, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';

const CharacterView: React.FC = () => {

	const { id } = useParams(); // Get the character ID from the URL params
    const { loading, error, data, refetch } = useQuery(
        GET_CHARACTER_BY_ID, 
        {
            variables: { id },
        }
    );

    useEffect(() => {
        refetch({ id: id });
    }, [id, refetch]);
    
	if (loading) return <div style={{ height: '80vh'}}><CircularProgress data-testid="loading-spinner" sx={{margin: 'auto' ,display: 'flex', justifyContent: 'center' }}/></div>;
	if (error) return <Alert severity="error">Error: {error.message}</Alert>;

	const character = data?.character;


	return <div className={styles.characterViewWrapper}>
		<Card variant="outlined" sx={{ maxWidth: 360, margin: 'auto' }}>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<ListItem>
					<ListItemText primary="Name" secondary={character.name} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Species" secondary={character.species} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Origin" secondary={character.origin.name} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Location" secondary={character.location.name} />
				</ListItem>
			</List>
		</Card>
	</div>
	
}

export default CharacterView
