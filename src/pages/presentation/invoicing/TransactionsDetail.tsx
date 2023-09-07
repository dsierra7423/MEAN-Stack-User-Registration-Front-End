import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { dateHourFormat, priceFormat } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../../contexts/authContext';
// import { ITransactions } from '../../../common/data/interfacesRecurly';
import { fetchTransaction } from '../../../helpers/requests';
import Spinner from '../../../components/bootstrap/Spinner';
import { ITransactions } from '../../../common/data/invoicesInterface';

const TransactionsDetail = () => {
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const [transaction, setTransaction] = useState<ITransactions>();
	const { dataUserProfile } = useContext(AuthContext);

	const { t } = useTranslation('invoicing');

	useEffect(() => {
		if(id != null || id != undefined){
			fetchTransaction(id).then(response => {
				if(!response.err){
					const code = response.status_code;

					switch (code) {
						case 200:
							setTransaction(response.data);
							break;
					
						default:
							console.log(`Error: ${response.data}`);
							//showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
							break;
					}
				}
				else{
					//showNotification('Invoice', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}
	}, [id]);

	return (
		<PageWrapper title={demoPagesMenu.invoicing.subMenu.transactionsDetail.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${demoPagesMenu.invoicing.subMenu.transactions.path}`}>
						Back to List
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
							<CardHeader>
								<CardLabel icon='Info'>
									<CardTitle tag='div' className='h5'>
										Transaction
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{transaction != null && transaction != undefined
									? <table className='table table-modern table-hover'>
										<tr>
											<th>
												<div className='mb-2'>Type:</div>
											</th>
											<td>
												<div className='mb-2'>
													{(transaction.type).charAt(0).toUpperCase() + (transaction.type).slice(1)}
												</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='mb-2'>Amount: </div>
											</th>
											<td>
												<div className='mb-2'>
													{priceFormat(transaction.amount)}
												</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='mb-2'>Status:</div>
											</th>
											<td>
												<div className='mb-2'>
													{(transaction.status).charAt(0).toUpperCase() + (transaction.status).slice(1)}
												</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='mb-2'>Origin:</div>
											</th>
											<td>
												<div className='mb-2'>{transaction?.origin}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='mb-2'>Date:</div>
											</th>
											<td>
												<div className='mb-2'>
													{dateHourFormat(transaction.created_at)}
												</div>
											</td>
										</tr>
									</table>
									: <div className='d-flex justify-content-center'>
										<Spinner color="info" isGrow={false} size={50} />
									</div>
								}
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Note'>
									<CardTitle tag='div' className='h5'>
										Notes
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{transaction != null && transaction != undefined
									? <table className='table table-modern table-hover'>
										<tr>
											<td>
												<div className='p-2'></div>
											</td>
										</tr>
									</table>
									: <div className='d-flex justify-content-center'>
										<Spinner color="info" isGrow={false} size={50} />
									</div>
								}
							</CardBody>
						</Card>
					</div>
					
					<div className='col-lg-8'>
						<Card className='shadow-3d-primary'>
							<CardHeader>
								<CardLabel icon='PersonPin'>
									<CardTitle tag='div' className='h5'>
										Billing Address
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{transaction != null && transaction != undefined
									? <table className='table table-modern table-hover'>
										<tr>
											<th>
												<div className='p-2'>Street 1:</div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.street1}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='p-2'>Street 2: </div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.street2}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='p-2'>City:</div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.city}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='p-2'>Region:</div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.region}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='p-2'>Postal Code:</div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.postal_code}</div>
											</td>
										</tr>
										<tr>
											<th>
												<div className='p-2'>Country:</div>
											</th>
											<td>
												<div className='p-2'>{transaction.billing_address.country}</div>
											</td>
										</tr>
									</table>
									: <div className='d-flex justify-content-center'>
										<Spinner color="info" isGrow={false} size={50} />
									</div>
								}
								
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='CreditCard'>
									<CardTitle tag='div' className='h5'>
										Method
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								{transaction != null && transaction != undefined
									? <div className='row g-4 align-items-center'>
										<div className='col-12'>
											<div
												className={`d-flex align-items-center bg-l${darkModeStatus ? 'o25' : '10'
													}-info rounded-2 p-2`}>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0'>
														{((transaction.payment_method.object).charAt(0).toUpperCase() + (transaction.payment_method.object).slice(1)).replace("_", " ")}
													</div>
													<div className='text-muted mt-n2 truncate-line-1'>
														Method
													</div>
												</div>
											</div>
										</div>
										<div className='col-12'>
											<div
												className={`d-flex align-items-center bg-l${darkModeStatus ? 'o25' : '10'
													}-success rounded-2 p-2`}>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0'>
														{`${transaction.payment_method.card_type} ****${transaction.payment_method.last_four}`}
													</div>
													<div className='text-muted mt-n2 truncate-line-1'>
														Credit Card
													</div>
												</div>
											</div>
										</div>
									</div>
									: <div className='d-flex justify-content-center'>
										<Spinner color="info" isGrow={false} size={50} />
									</div>
								}
								
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TransactionsDetail;
