import React, { ReactNode, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
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
import { getUsersFromDeptoOAuth, removeUserFromDeptoOAuth } from '../../../../helpers/requests';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import { useParams } from 'react-router-dom';
import { IUserInfo } from '../../../../common/data/invoicesInterface';
import MemberModal from './MemberModal';

const DepartmentMembers = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const { id } = useParams();
	const [users, setUsers] = useState<IUserInfo[]>([]);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [updateTable, setUpdateTable] = useState('');

	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			member: Object.keys(users).map((i: any) => users[i].name)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = users.filter(
		(f) =>
			// name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { t } = useTranslation('invoicing');


	useEffect(() => {
		if(id != null && id != undefined){
			const depto_id = (id.split('-'))[1];
			getUsersFromDeptoOAuth(depto_id).then(response => {
				if(!response.err){
					setUsers(response);
				}
				else{
					showNotification('Members', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}

	}, [id, updateTable]);

	const deleteUserFromDepto = (user_id: string, depto_id: string) => {
		removeUserFromDeptoOAuth(user_id, depto_id).then(response => {
			if(!response.err){
				setUpdateTable(user_id);
				showNotification('Deleted Successfully', 'User has been deleted successfully.', 'success');
			}
			else{
				console.log(`error: ${response.statusText}`);
			}
		});
	}

	return (
		<PageWrapper title={demoPagesMenu.administration.subMenu.members.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						size='sm'
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPagesMenu.administration.subMenu.departments.path}`}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search User...'
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
								<CardLabel icon='Business' iconColor='success'>
									<CardTitle tag='div' className='h3'>
										{`Department - ${id != null && id != undefined ? (id.split('-'))[0] : ''}`}
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='dark'
										isLight
										icon='PersonAdd'
										onClick={() => {
											handleClickEdit();
										}}
									>
										Add User
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>

											<th>Name</th>
											<th>Email</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{users.length > 0
											? dataPagination(items, currentPage, perPage).map(user => (
												<tr>
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
																	{user.name}
																</div>
															</div>
														</div>
													</td>
													<td>{user.email}</td>
													<td>
														<Button
															icon='Delete'
															tag='a'
															size='lg'
															onClick={() => {
																if (id != null && id != undefined) {
																	const depto_id = (id.split('-'))[1];
																	deleteUserFromDepto(user.user_id, depto_id);
																}
															}}
														>

														</Button>
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
								label='members'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<MemberModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				setUpdateTable={setUpdateTable}
				usersRol={users}
				depto_id={id}
			/>
		</PageWrapper>
	);
};

export default DepartmentMembers;
