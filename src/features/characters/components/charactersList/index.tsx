import { Link } from 'react-router-dom';
import { ICharacter } from "../../types"
import styles from './styles.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../services/characters';

interface Column {
	id: 'name' | 'species' | 'origin' | 'location' | 'actions';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'species', label: 'Species', minWidth: 100 },
	{ id: 'origin', label: 'Origin', minWidth: 100 },
	{ id: 'location', label: 'Location', minWidth: 100 },
	{ id: 'actions', label: 'Actions', minWidth: 100 }
  ];

const ROWS_PER_PAGE = 20
const CharactersList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(
		GET_CHARACTERS, 
		{
			variables: { 
				page: currentPage
			},
			fetchPolicy: "cache-and-network"
		}
	);

	useEffect(() => {
		refetch({ page: currentPage });
	}, [currentPage, refetch]);

	const { characters: { info: { count }, results } } = data || { characters: { info: { count: 0 }, results: [] } };
  	
	if (loading) return <div style={{ height: '80vh'}}><CircularProgress data-testid="loading-spinner" sx={{margin: 'auto' ,display: 'flex', justifyContent: 'center' }}/></div>;
	if (error) return <Alert severity="error">Error: {error.message}</Alert>;
	const handleChangePage = (event: unknown, newPage: number) => {
		setCurrentPage(newPage);
	};

	return <div className={styles.charactersListWrapper} data-testid="characters-list">
		<Typography variant="h4" gutterBottom>
			Characters
		</Typography>
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 540 }}>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						>
						{column.label}
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{results
					.map((character: ICharacter) => {
						return (
						<TableRow hover role="checkbox" tabIndex={-1} key={character.id}>
							{columns.map((column) => {
							  const value = character[column.id];
							  return (
								<TableCell key={column.id} align={column.align}>
								  {typeof value === 'object' && value !== null && !Array.isArray(value)
									? value.name : column.id === 'actions'? 
										<Link to={`/character-details/${character.id}`}>
											<Button color="success" variant="outlined">View</Button>
										</Link>
									: value }
								</TableCell>
							  );
							})}
						</TableRow>
						);
					})}
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={count}
				rowsPerPage={ROWS_PER_PAGE}
				page={currentPage}
				onPageChange={handleChangePage}
			/>
		</Paper>
	</div>
	
}

export default CharactersList
