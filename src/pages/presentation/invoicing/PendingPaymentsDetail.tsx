import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { dateFormat, priceFormat } from '../../../helpers/helpers';
import useSortableData from '../../../hooks/useSortableData';
import useDarkMode from '../../../hooks/useDarkMode';
import { pendingPayments } from '../../../common/data/invoicingData';
import AuthContext from '../../../contexts/authContext';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/bootstrap/Spinner';
import { fetchInvoice } from '../../../helpers/requests';
import { IInvoice } from '../../../common/data/invoicesInterface';
import showNotification from '../../../components/extras/showNotification';

const PendingPaymentsDetail = () => {
	const { darkModeStatus } = useDarkMode();
	const { id } = useParams();
	const [invoice, setInvoice] = useState<IInvoice>();
	const { dataUserProfile } = useContext(AuthContext);
	const { t } = useTranslation(['invoicing', 'profile']);

	useEffect(() => {
		if(id != null || id != undefined){
			fetchInvoice(id).then(response => {
				if(!response.err){
					const code = response.status_code;

					switch (code) {
						case 200:
							setInvoice(response.data);
							break;
					
						default:
							console.log(`Error: ${response.data}`);
							showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
							break;
					}
				}
				else{
					showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}
	}, [id]);

	return (
		<PageWrapper title={demoPagesMenu.invoicing.subMenu.pendingPaymentsDetail.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPagesMenu.invoicing.subMenu.pendingPayments.path}`}>
						Back to List
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{t('Invoice #') as ReactNode} {invoice != undefined ||  invoice != null ? invoice.number : ''}</span>
				</div>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
							<CardHeader>
									<CardTitle tag='div' className='h5'>
										Bill to:
									</CardTitle>
							</CardHeader>
							<CardBody>
								<div className='row g-5 py-3'>
									<div className='col-12 d-flex justify-content-center'>
										{dataUserProfile.picture
											?<Avatar
												src={dataUserProfile.picture}
												srcSet={dataUserProfile.picture}
											/>
											: <Spinner color="info" isGrow={false} isSmall={true}/>
										}
									</div>
									<div className='col-12'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Person'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`${invoice?.address.first_name} ${invoice?.address.last_name}`}
														</div>
														<div className='text-muted'>
															Full Name
														</div>
													</div>
												</div>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{dataUserProfile.email ? dataUserProfile.email : ""}
														</div>
														<div className='text-muted'>
															{t('profile:Email') as ReactNode}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-12'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-info rounded-2 p-3`}>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>{invoice != null || invoice != undefined ? priceFormat(invoice.paid) : ''}</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('Paid') as ReactNode}
												</div>
											</div>
										</div>
									</div>
									<div className='col-12'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-danger rounded-2 p-3`}>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>{invoice != null || invoice != undefined ? priceFormat(invoice.balance) : ''}</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('Balance Due') as ReactNode}
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card
							stretch
							className='overflow-hidden'>
							<CardHeader>
								<CardLabel icon='Receipt'>
									<CardTitle tag='div' className='h5'>
										Details
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-warning rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Tag' size='3x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>{invoice != null || invoice != undefined ? invoice.number : ''}</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('Invoice Number') as ReactNode}
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-info rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Today' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													{invoice != null || invoice != undefined ? dateFormat(invoice.closed_at) : ''}
												</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('Closed At') as ReactNode}
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-primary rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='CalendarToday' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>{invoice != null || invoice != undefined ? dateFormat(invoice.created_at) : ''}</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('Billed From') as ReactNode}
												</div>
											</div>
										</div>
									</div>
								</div>
								<br/>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>Date</th>
											<th>Descripction</th>
											<th>Quantity</th>
											<th>Price Unit</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
										{
											invoice != null || invoice != undefined
											?
												invoice.line_items.map(item => (
													<tr key={item.id}>
														<td>{`${dateFormat(item.start_date)} - ${dateFormat(item.end_date)}`}</td>
														<td>{item.description}</td>
														<td>{item.quantity}</td>
														<td>{priceFormat(item.unit_amount)}</td>
														<td>{priceFormat(item.amount)}</td>
													</tr>
												))
											:	<tr><td align='center' colSpan={5}>No data</td></tr>
										}
									</tbody>
									<br/>
									<tfoot>
										<tr>
											<th scope="row" colSpan={4}>Subtotal</th>
											<td align='right'>
												<span className='border border-info border-2 text-info fw-bold px-3 py-1 rounded'>
													{invoice != null || invoice != undefined ? priceFormat(invoice.subtotal) : ''}
												</span>
												
												
											</td>
											<br/>
										</tr>
										<tr>
											<th scope="row" colSpan={4}>Total</th>
											<td align='right'>
												<span className='border border-info border-2 text-info fw-bold px-3 py-1 rounded'>
													{invoice != null || invoice != undefined ? priceFormat(invoice.total) : ''}
												</span>
											</td>
										</tr>
										<tr>
											<th scope="row" colSpan={4}>Paid</th>
											<td align='right'>
												<span className='border border-success border-2 text-success fw-bold px-3 py-1 rounded'>
													{invoice != null || invoice != undefined ? '-' + priceFormat(invoice.paid) : ''}
												</span>
											</td>
										</tr>
										<tr>
											<th scope="row" colSpan={4}>Balance Due</th>
											<td align='right'>
												<span className='border border-warning border-2 text-warning fw-bold px-3 py-1 rounded'>
													{invoice != null || invoice != undefined ? priceFormat(invoice.balance) : ''}
												</span>
											</td>
										</tr>
									</tfoot>
								</table>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default PendingPaymentsDetail;
