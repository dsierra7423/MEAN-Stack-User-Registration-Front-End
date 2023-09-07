import React, { ReactNode, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft
} from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';
import { demoPagesMenu } from '../../../../menu';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import Button from '../../../../components/bootstrap/Button';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/bootstrap/forms/Input';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import useSortableData from '../../../../hooks/useSortableData';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../../components/bootstrap/Dropdown';
import { dateHourFormat } from '../../../../helpers/helpers';
import { IUserProfile } from '../../../../common/data/invoicesInterface';
import { deleteUserOAuth, getUsersOAuth } from '../../../../helpers/requests';
import Spinner from '../../../../components/bootstrap/Spinner';
import UserEditModal from './UserEditModal';
import showNotification from '../../../../components/extras/showNotification';

export interface IEditUser {
	type: string,
	user: {
		user_id?: string
		name: string,
		last_name: string,
		email: string,
		password: string
	}
}

const transaction:IEditUser  = {
	type: 'create',
	user: {
		name: '',
		last_name: '',
		email: '',
		password: ''
	}
}

const Users = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [users, setUsers] = useState<IUserProfile[]>([]);
	const [editUser, setEditUser] = useState<IEditUser>(transaction);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [updateTable, setUpdateTable] = useState('');

	const handleClickEdit = (transaction: IEditUser) => {
		setEditUser(transaction);
		setEditModalStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			user: Object.keys(users).map((i: any) => users[i].name)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = users.filter(
		(f) =>
			// name
			f.given_name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) ||
			f.family_name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { t } = useTranslation('invoicing');

	const deleteUser = (user_id: string) => {
		deleteUserOAuth(user_id).then(response => {
			if(!response.err){
				console.log('respuesta');
				console.log(JSON.stringify(response));

				setUpdateTable(user_id);
				showNotification('Deleted Successfully', 'User has been deleted successfully.', 'success');
			}
			else{
				console.log(`error: ${response.statusText}`);
			}
		});
	}

	useEffect(() => {
		getUsersOAuth().then(response => {
			if(!response.err){
				setUsers(response);
			}
			else{
				console.log(`error: ${response}`);
			}
		});
	}, [updateTable]);

	return (
		<PageWrapper title={demoPagesMenu.administration.subMenu.users.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder={(t('Search User...') as ReactNode)?.toString()}
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader borderSize={3}>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle tag='div' className='h3'>
										Users
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='dark'
										isLight
										icon='PersonAdd'
										onClick={() => {
											handleClickEdit(transaction);
										}}>
										Add New User
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											<th>Email</th>
											<th>Created at</th>
											<th>Updated at</th>
											<th>Last login</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{users.length > 0
											? dataPagination(items, currentPage, perPage).map(user => (
												<tr key={user.user_id}>
													<td>
														<div className='d-flex align-items-center'>
															<div className='user-avatar'>
																<img
																	srcSet={user.picture}
																	src={user.picture}
																	alt='Avatar'
																	width={50}
																	height={50}
																/>
															</div>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{user.given_name} {user.family_name}
																</div>
															</div>
														</div>
													</td>
													<td>
														<Button
															isLink
															color='light'
															icon='Email'
															className='text-lowercase'
															tag='a'
															href={`mailto:${user.email}`}>
															{user.email}
														</Button>
													</td>
													<td>{dateHourFormat(user.created_at)}</td>
													<td>{dateHourFormat(user.updated_at)}</td>
													<td>{user.last_login ? dateHourFormat(user.last_login) : "Never"}</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	icon='MoreHoriz'
																	color='dark'
																	isLight
																	shadow='sm'
																	aria-label='More actions'
																/>
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='a'
																		onClick={() => {
																			const transaction = {
																				type: 'edit',
																				user: {
																					user_id: user.user_id,
																					name: user.given_name,
																					last_name: user.family_name,
																					email: user.email,
																					password: ''
																				}
																			};
																			handleClickEdit(transaction);
																		}}>
																		Edit
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Delete'
																		tag='a'
																		onClick={() => deleteUser(user.user_id)}>
																		Delete
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))
											: <tr>
												<td align='center' colSpan={8}>
													{<Spinner color="info" isGrow={false} size={80} />}
												</td>
											</tr>
										}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='users'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<UserEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				setUpdateTable={setUpdateTable}
				editUser={editUser}
			/>
		</PageWrapper>
	);
};

export default Users;
