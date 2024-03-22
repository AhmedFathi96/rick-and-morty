import { Link } from 'react-router-dom';
import { IEpisode } from "../../types"
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
import { GET_EPISODES } from '../../services/episodes';

interface Column {
	id: 'name' | 'air_date' | 'episode' | 'actions';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'air_date', label: 'Air Date', minWidth: 100 },
	{ id: 'episode', label: 'Episode', minWidth: 100 },
	{ id: 'actions', label: 'Actions', minWidth: 100 }
  ];

const ROWS_PER_PAGE = 20
const EpisodesList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(
		GET_EPISODES, 
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

	const { episodes: { info: { count }, results } } = data || { episodes: { info: { count: 0 }, results: [] } };
  	
	if (loading) return <div style={{ height: '80vh'}}><CircularProgress data-testid="loading-spinner" sx={{margin: 'auto' ,display: 'flex', justifyContent: 'center' }}/></div>;
	if (error) return <Alert severity="error">Error: {error.message}</Alert>;

	const handleChangePage = (event: unknown, newPage: number) => {
		setCurrentPage(newPage);
	};

	return <div>
		<Typography variant="h4" gutterBottom>
			Episodes
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
					.map((episode: IEpisode) => {
						return (
						<TableRow hover role="checkbox" tabIndex={-1} key={episode.id}>
							{columns.map((column) => {
							  const value = episode[column.id];
							  return (
								<TableCell key={column.id} align={column.align}>
								  {column.id === 'actions'? 
										<Link to={`/episode-details/${episode.id}`}>
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

export default EpisodesList
