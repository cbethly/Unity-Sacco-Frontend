import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { startGettingUsers, deleteUser } from '../../actions/admin'
import { fetchConToken } from '../../helpers/fetchHelper'
import { Navbar } from '../navbar/Navbar'

export const UsersInfoScreen = () => {
	
	const { total } = useSelector(state => state.admin);
	const dispatch = useDispatch();

	const [isUnMounted, setIsUnMounted] = useState(false);


	const users = total.users;

	const handleDeleteUser = ( id ) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {			

				// TODO: CREATE TODO ACTION
				startDeletingUser( id );

				
				// dispatch(deleteUser());
				// dispatch(startGettingUsers());

				Swal.fire(
					'Deleted!',
					'The user has been deleted.',
					'success'
				);
			}

			if (result.isDismissed) {
				
				Swal.fire(
					'Cancelled',
					'The action was denied',
					'error'
				)
			}

		});
		
	}


	const startDeletingUser = async( id ) => {
		const resp = await fetchConToken(`users/${id}`, {},'DELETE');
		const body = await resp.json();

		console.log(body);
	}


	
	return (
		<div>
			<Navbar />

			<Container>
				<MainTitle>Total users: {total.total}</MainTitle>

				<UserTables>
					<tbody>
						<UserTableContainer>
							<UserTableHeader size='30%'>User</UserTableHeader>
							<UserTableHeader size='30%'>Email</UserTableHeader>
							<UserTableHeader size='28%'>ID</UserTableHeader>
							<UserTableHeader size='12%'>-</UserTableHeader>
						</UserTableContainer>

							{
								users.map( user => {
									
									
									if (user.role === 'USER_ROLE' && user.status === true) {
										return(
											<UserTableContainer key={user.phone}>
												<UserTableRow>{`${user.firstname} ${user.lastname}`}</UserTableRow>
												<UserTableRow>{user.email}</UserTableRow>
												<UserTableRow>{user.id}</UserTableRow>
												<DeleteRow onClick={() => handleDeleteUser( user.id )}>
													<DeleteIcon className="far fa-trash-alt"></DeleteIcon>
												</DeleteRow>
											</UserTableContainer>
										)
											
									}
									
									
								})
							}

					</tbody>		
				</UserTables>		
			</Container>
		</div>
	)
}



const Container = styled.div`
	width: 80vw;
	margin: 0px 270px;
`;

const MainTitle = styled.h1`
	margin: 50px 0px;
	padding-left: 20px;
`;

const UserTables = styled.table`
	width: 100%;
`;

const UserTableContainer = styled.tr``;

const UserTableHeader = styled.th`
	width: ${props => props.size};
	padding: 12px 8px;
	color: white;
	font-size: 20px;
	font-weight: normal;
	border: 1px solid #ccc;
	background-color: #2980B9;
`;

const UserTableRow = styled.td`
	padding: 12px;
	border: 1px solid #ccc;
	font-size: 18px;
`;

const DeleteRow = styled.td`
	border: 1px solid #ccc;
	font-size: 18px;
	background-color: #E53737;
	padding: 12px;

	&:hover{
		cursor: pointer;
	}

`;

const DeleteIcon = styled.i`
	width: 100%;
	text-align: center;
	background-color: #E53737;
	height: 100%;
	color: white;

	&:hover{
		cursor: pointer;
	}
`;