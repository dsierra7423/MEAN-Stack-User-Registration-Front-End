import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
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
import Popovers from '../../../components/bootstrap/Popovers';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { DateRangePicker } from 'react-date-range';
import { transactions } from '../../../common/data/invoicingData';
import useSortableData from '../../../hooks/useSortableData';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import { dateHourFormat, priceFormat } from '../../../helpers/helpers';
import AuthContext from '../../../contexts/authContext';
import { getTransactions } from '../../../helpers/requests';
// import { ITransactions } from '../../../common/data/interfacesRecurly';
import Spinner from '../../../components/bootstrap/Spinner';
import { ITransactions } from '../../../common/data/invoicesInterface';

const Transactions = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [transactions, setTransactions] = useState<ITransactions[]>([]);
	const { dataUserProfile } = useContext(AuthContext);
	const account_id = dataUserProfile.user_metadata ? dataUserProfile.user_metadata.id_recurly : null;

	
	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(transactions).map((i: any) => transactions[i].type)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = transactions.filter(
		(f) =>
			// transaction type
			f.type.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

	const [state, setState] = useState({
		selection: {
			startDate: dayjs().startOf('week').add(-1, 'week').toDate(),
			endDate: dayjs().endOf('week').toDate(),
			key: 'selection',
		},
		selection2: {
			startDate: dayjs().startOf('week').add(-1, 'week').add(2, 'day').toDate(),
			endDate: dayjs().endOf('week').add(-4, 'day').toDate(),
			key: 'selection2',
		},
		selection3: {
			startDate: dayjs().startOf('week').add(3, 'week').add(2, 'day').toDate(),
			endDate: dayjs().startOf('week').add(3, 'week').add(2, 'day').toDate(),
			key: 'selection3',
		},
	});

	const datePicker = (
		<DateRangePicker
			onChange={(item) => setState({ ...state, ...item })}
			// showSelectionPreview
			moveRangeOnFirstSelection={false}
			retainEndDateOnFirstSelection={false}
			months={2}
			ranges={[state.selection, state.selection2, state.selection3]}
			direction='horizontal'
			rangeColors={[
				String(import.meta.env.VITE_PRIMARY_COLOR),
				String(import.meta.env.VITE_SECONDARY_COLOR),
				String(import.meta.env.VITE_SUCCESS_COLOR),
			]}
		/>
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { t } = useTranslation('invoicing');

	useEffect(() => {
		if(account_id != null){
			getTransactions(account_id).then(response => {
				if(!response.err){
					const code = response.status_code;

					switch (code) {
						case 200:
							setTransactions(response.data.data);
							break;
					
						default:
							//showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
							console.log(`Error: ${response.data}`);
							break;
					}
				}
				else{
					//showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}
	}, [account_id]);

	return (
		<PageWrapper title={demoPagesMenu.invoicing.subMenu.transactions.text}>
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
						placeholder={(t('Search transactions...') as ReactNode)?.toString()}
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						placement='bottom-end'
						className='mw-100 overflow-hidden'
						data-tour='date-range-menu'
						bodyClassName='p-0'
						trigger='click'
						desc={datePicker}>
						<Button color='dark' isLight data-tour='date-range' size='sm'>
							{`${dayjs(state.selection.startDate).format('MMM Do YY')} - ${dayjs(
								state.selection3.endDate,
							).format('MMM Do YY')}`}
						</Button>
					</Popovers>
					<SubheaderSeparator />
					<Button color='dark' isLight data-tour='date-range' size='sm'>
						{t('Print') as ReactNode}
					</Button>
					<Button color='dark' isLight data-tour='date-range' size='sm'>
						{t('Download') as ReactNode}
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
											<th>Type</th>
											<th>Method</th>
											<th>Date</th>
											<th>Status</th>
											<th>Amount</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{
											transactions.length > 0
												?
												dataPagination(items, currentPage, perPage).map(item => (
													<tr key={item.id}>
														<td>{(item.type).charAt(0).toUpperCase() + (item.type).slice(1)}</td>
														<td>{`${item.payment_method.card_type}  ****${item.payment_method.last_four}`}</td>
														<td>{dateHourFormat(item.created_at)}</td>
														<td>{(item.status).charAt(0).toUpperCase() + (item.status).slice(1)}</td>
														<td>{priceFormat(item.amount)}</td>
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
																			to={`../${demoPagesMenu.invoicing.subMenu.transactionsDetail.path}/${item.id}`}
																		>Detail
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</td>
													</tr>
												))
												: <tr>
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
								label='transactions'
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

export default Transactions;
