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
import { IDepartments } from '../../../../common/data/invoicesInterface';
import { deleteDepartmentOAuth, getDepartmentsOAuth } from '../../../../helpers/requests';
import Spinner from '../../../../components/bootstrap/Spinner';
import showNotification from '../../../../components/extras/showNotification';
import DeptoEditModal from './DeptoEditModal';

export interface IEditDepto {
	type: string,
	depto: {
		id?: string,
		name: string,
		display_name: string
	}
}

const transaction:IEditDepto  = {
	type: 'create',
	depto: {
		name: '',
		display_name: '',
	}
}

const Departments = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [departments, setDepartments] = useState<IDepartments[]>([]);
	const [editDepto, setEditDepto] = useState<IEditDepto>(transaction);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [updateTable, setUpdateTable] = useState('');

	const handleClickEdit = (transaction: IEditDepto) => {
		setEditDepto(transaction);
		setEditModalStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			depto: Object.keys(departments).map((i: any) => departments[i].name)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = departments.filter(
		(f) =>
			// name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { t } = useTranslation('invoicing');

	const deleteDepto = (depto_id: string) => {
		deleteDepartmentOAuth(depto_id).then(response => {
			if(!response.err){
				console.log('respuesta');
				console.log(JSON.stringify(response));

				setUpdateTable(depto_id);
				showNotification('Deleted Successfully', 'Department has been deleted successfully.', 'success');
			}
			else{
				console.log(`error: ${response.statusText}`);
			}
		});
	}

	useEffect(() => {
		getDepartmentsOAuth().then(response => {
			if(!response.err){
				setDepartments(response);
			}
			else{
				console.log(`error: ${response}`);
			}
		});
	}, [updateTable]);

	return (
		<PageWrapper title={demoPagesMenu.administration.subMenu.departments.text}>
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
						placeholder={(t('Search Department...') as ReactNode)?.toString()}
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
										Departments
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										color='dark'
										isLight
										icon='Add'
										onClick={() => {
											handleClickEdit(transaction);
										}}
									>
										Add New Department
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Display Name</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{departments.length > 0
											? dataPagination(items, currentPage, perPage).map(depto => (
												<tr key={depto.id}>
													<td>{depto.name}</td>
													<td>{depto.display_name}</td>
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
																		to={`../${demoPagesMenu.administration.subMenu.members.path}/${depto.display_name}-${depto.id}`}
																	>
																		Members
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='a'
																		onClick={() => {
																			const transaction = {
																				type: 'edit',
																				depto: {
																					id: depto.id,
																					name: depto.name,
																					display_name: depto.display_name,
																				}
																			};
																			handleClickEdit(transaction);
																		}}
																	>
																		Edit
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Delete'
																		tag='a'
																		onClick={() => deleteDepto(depto.id)}
																	>
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
								label='deptos'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			<DeptoEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				setUpdateTable={setUpdateTable}
				editDepto={editDepto}
			/>
		</PageWrapper>
	);
};

export default Departments;
