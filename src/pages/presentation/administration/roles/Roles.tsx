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
import { IRoles } from '../../../../common/data/invoicesInterface';
import { deleteRolOAuth, getRolesOAuth } from '../../../../helpers/requests';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import RolEditModal from './RolEditModal';

export interface IEditRol {
	type: string,
	rol: {
		id?: string,
		name: string,
		description: string
	}
}

const transaction:IEditRol  = {
	type: 'create',
	rol: {
		name: '',
		description: '',
	}
}

const Roles = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [roles, setRoles] = useState<IRoles[]>([]);
	const [editRol, setEditRol] = useState<IEditRol>(transaction);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [updateTable, setUpdateTable] = useState('');

	const handleClickEdit = (transaction: IEditRol) => {
		setEditRol(transaction);
		setEditModalStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			rol: Object.keys(roles).map((i: any) => roles[i].name)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = roles.filter(
		(f) =>
			// name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { t } = useTranslation('invoicing');

	const deleteRol = (rol_id: string) => {
		deleteRolOAuth(rol_id).then(response => {
			if(!response.err){
				console.log('respuesta');
				console.log(JSON.stringify(response));

				setUpdateTable(rol_id);
				showNotification('Deleted Successfully', 'Rol has been deleted successfully.', 'success');
			}
			else{
				console.log(`error: ${response.statusText}`);
			}
		});
	}

	useEffect(() => {
		getRolesOAuth().then(response => {
			if(!response.err){
				setRoles(response);
			}
			else{
				console.log(`error: ${response}`);
			}
		});
	}, [updateTable]);

	return (
		<PageWrapper title={demoPagesMenu.administration.subMenu.roles.text}>
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
						placeholder={(t('Search Role...') as ReactNode)?.toString()}
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
								<CardLabel icon='Groups' iconColor='success'>
									<CardTitle tag='div' className='h3'>
										Roles
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='dark'
										isLight
										icon='GroupAdd'
										onClick={() => {
											handleClickEdit(transaction);
										}}>
										Add New Role
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>

											<th>Role</th>
											<th>Description</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{roles.length > 0
											? dataPagination(items, currentPage, perPage).map(rol => (
												<tr key={rol.id}>
													<td>{rol.name}</td>
													<td>{rol.description}</td>
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
																		icon='PersonAddAlt'
																		tag='a'
																		to={`../${demoPagesMenu.administration.subMenu.roleDetail.path}/${rol.name}-${rol.id}`}
																		>
																		Assign to users
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='a'
																		onClick={() => {
																			const transaction = {
																				type: 'edit',
																				rol: {
																					id: rol.id,
																					name: rol.name,
																					description: rol.description,
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
																		onClick={() => deleteRol(rol.id)}>
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
								label='roles'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<RolEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				setUpdateTable={setUpdateTable}
				editRol={editRol}
			/>
		</PageWrapper>
	);
};

export default Roles;
