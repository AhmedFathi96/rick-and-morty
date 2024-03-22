import { useQuery } from '@apollo/client';
import styles from './styles.module.scss'
import { GET_LOCATION_BY_ID } from "../../services/locations";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Card, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { ICharacter } from '../../../characters/types';

const LocationView: React.FC = () => {

	const { id } = useParams(); // Get the character ID from the URL params
    const { loading, error, data, refetch } = useQuery(
        GET_LOCATION_BY_ID, 
        {
            variables: { id },
        }
    );

    useEffect(() => {
        refetch({ id: id });
    }, [id, refetch]);
    
	if (loading) return <div style={{ height: '80vh'}}><CircularProgress data-testid="loading-spinner" sx={{margin: 'auto' ,display: 'flex', justifyContent: 'center' }}/></div>;
	if (error) return <Alert severity="error">Error: {error.message}</Alert>;

	const location = data?.location;


	return <div className={styles.locationViewWrapper}>
		<Card variant="outlined" sx={{ maxWidth: 360, margin: 'auto' }}>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<ListItem>
					<ListItemText primary="Name" secondary={location.name} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Air date" secondary={location.type} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Episode" secondary={location.dimensions} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Characters" secondary={location.residents.map((obj:ICharacter) => obj.name).join(',')} />
				</ListItem>
			</List>
		</Card>
	</div>
	
}

export default LocationView
