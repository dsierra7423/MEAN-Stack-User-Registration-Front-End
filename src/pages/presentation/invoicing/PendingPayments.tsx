import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import { pendingPayments } from '../../../common/data/invoicingData';
import useSortableData from '../../../hooks/useSortableData';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import { dateFormat, priceFormat } from '../../../helpers/helpers';
import { getInvoices } from '../../../helpers/requests';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';
import { IInvoice } from '../../../common/data/invoicesInterface';
import showNotification from '../../../components/extras/showNotification';

const PendingPayments = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [invoices, setInvoices] = useState<IInvoice[]>([]);
	const { dataUserProfile } = useContext(AuthContext);
	const account_id = dataUserProfile.user_metadata ? dataUserProfile.user_metadata.id_recurly : null;

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(invoices).map((i: any) => invoices[i].number)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	useEffect(() => {
		if(account_id != null){
			getInvoices(account_id).then(response => {
				if(!response.err){
					const code = response.status_code;

					switch (code) {
						case 200:
							setInvoices(response.data.data);
							break;
					
						default:
							showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
							console.log(`Error: ${response.data}`);
							break;
					}
				}
				else{
					showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}
	}, [account_id]);

	
	const filteredData = invoices.filter(
		(f) =>
			// invoice number
			f.number.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const { t } = useTranslation('invoicing');

	return (
		<PageWrapper title={demoPagesMenu.invoicing.subMenu.pendingPayments.text}>
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
						placeholder={(t('Search pending payments...') as ReactNode)?.toString()}
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button 
						color='dark' 
						isLight data-tour='date-range' 
						size='sm'>
						{t('Download') as ReactNode}
					</Button>
					<Button 
						color='dark' 
						isLight data-tour='date-range' 
						size='sm'>
						{t('Stop payment') as ReactNode}
					</Button>
					<Button color='dark' isLight data-tour='date-range' size='sm'>
						{t('Complete the payment') as ReactNode}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>Invoice</th>
											<th>Posted On</th>
											<th>Due On</th>
											<th>Status</th>
											<th>Balance</th>
											<th>Total</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{
											items.length > 0
												?
												dataPagination(items, currentPage, perPage).map((invoice) => (
													<tr key={invoice.id}>
														<td>{`#${invoice.line_items[0].invoice_number}`}</td>
														<td>{dateFormat(invoice.created_at)}</td>
														<td>{dateFormat(invoice.due_at)}</td>
														<td>{(invoice.state).charAt(0).toUpperCase() + invoice.state.slice(1)}</td>
														<td>{`${priceFormat(invoice.balance)} ${invoice.currency}`}</td>
														<td>{`${priceFormat(invoice.total)} ${invoice.currency}`}</td>
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
																			icon='Visibility'
																			tag='a'
																			to={`../${demoPagesMenu.invoicing.subMenu.pendingPaymentsDetail.path}/${invoice.id}`}
																		>
																			Detail
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</td>
													</tr>
												))
												:
												<tr>
													<td align='center' colSpan={6}>
														{<Spinner color="info" isGrow={false} size={80} />}
													</td>
												</tr>
										}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={filteredData}
								label='pendingPayments'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default PendingPayments;
