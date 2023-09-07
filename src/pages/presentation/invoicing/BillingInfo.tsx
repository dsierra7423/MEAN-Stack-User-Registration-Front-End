import React, { ReactNode, useContext, useState } from 'react';
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
import { priceFormat } from '../../../helpers/helpers';
import useSortableData from '../../../hooks/useSortableData';
import useDarkMode from '../../../hooks/useDarkMode';
import { pendingPayments } from '../../../common/data/invoicingData';
import AuthContext from '../../../contexts/authContext';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/bootstrap/Spinner';
import CommonMyWallet from '../../_common/CommonMyWallet';
import CommonDashboardTopSeller from '../dashboard/common/CommonDashboardTopSeller';
import CustomerEditModal from '../crm/CustomerEditModal';
import BillingInfoEditModal from './BillingInfoEditModal';

const BillingInfo = () => {
	const { darkModeStatus } = useDarkMode();

	const { dataUserProfile } = useContext(AuthContext);

	const { t } = useTranslation(['invoicing', 'profile']);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

	return (
		// <PageWrapper title={demoPagesMenu.invoicing.subMenu.billingInfo.text}>
		<PageWrapper title='Billing info'>
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
				<div className='row'>
					<div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div>
					<div className='col-xxl-8'>
						<Card>
							<CardHeader>
								<CardLabel icon='MapsHomeWork'>
									<CardTitle tag='div' className='h5'>
										Billing Information
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-md-6'>
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='MyLocation'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																Street1
															</div>
															<div className='text-muted'>
																245 May Street
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='PersonPinCircle'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																Street2
															</div>
															<div className='text-muted'>
																245 May Street
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='Apartment'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																City
															</div>
															<div className='text-muted'>
																CDMX
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='Place'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																State
															</div>
															<div className='text-muted'>
																Mexico
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='MarkunreadMailbox'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																Postal Code
															</div>
															<div className='text-muted'>
																11445
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='col-12'>
											<div className='row g-3'>
												<div className='col-12'>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<Icon
																icon='Public'
																size='3x'
																color='primary'
															/>
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																Country
															</div>
															<div className='text-muted'>
																Mexico
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<br />
										<div className='row g-2'>
											<div className='col-auto'>
												<Button
													icon='Edit'
													color='dark'
													isLight
													onClick={handleClickEdit}>
													Edit
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<BillingInfoEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={'1' || 'loading'}
			/>
		</PageWrapper>
	);
};

export default BillingInfo;
