import React, { useContext, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { setSubscription } from '../../../helpers/requests';
import AuthContext from '../../../contexts/authContext';
import { useFormik } from 'formik';
import Payment from 'payment';
// @ts-ignore
import ReactCreditCards, { Focused } from 'react-credit-cards-2';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import showNotification from '../../../components/extras/showNotification';

const validate = (values: {
	first_name: string;
	last_name: string;
	number: string;
	cvc: number | string;
	expiry: string;
}) => {
	const errors: {
		first_name: string;
		last_name: string;
		number: string;
		cvc: number | string;
		expiry: string;
	} = {
		first_name: '',
		last_name: '',
		number: '',
		cvc: '',
		expiry: '',
	};
	if (!values.first_name) {
		errors.first_name = 'Required';
	}

	if (!values.last_name) {
		errors.last_name = 'Required';
	}

	if (!values.number || values.number.includes('_')) {
		errors.number = 'Required';
	} else if (Payment.fns.validateCardNumber(values.number)) {
		errors.number = 'Invalid Card Number';
	}

	if (!values.cvc) {
		errors.cvc = 'Required';
	} else if (values.cvc.toString().length > 4) {
		errors.cvc = 'Must be 3 or 4 characters';
	}

	if (!values.expiry || values.expiry.includes('_')) {
		errors.expiry = 'Required';
	} else if (parseInt(values.expiry.slice(-2), 10) <= 20) {
		errors.expiry = 'Must be valid date';
	}

	return errors;
};

const PricingTablePage = () => {
	const { darkModeStatus } = useDarkMode();
	const { dataUserProfile } = useContext(AuthContext);
	const [planCode, setPlanCode] = useState('');
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const account_id = dataUserProfile.user_metadata ? dataUserProfile.user_metadata.id_recurly : null;
	const account_code = dataUserProfile.user_id ? dataUserProfile.user_id : null;
	const email = dataUserProfile.email ? dataUserProfile.email : null;

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			number: '',
			expiry: '',
			cvc: '',
		},
		validate,
		onSubmit: () => {
			console.log('onSubmit');
			console.log(formik.values);
			setModalStatus(false)
		},
	});

	const [focused, setFocused] = useState<Focused>('number');
	const handleInputFocus = ({ target }: { target: { name: Focused } }) => setFocused(target.name);

	

	return (
		<PageWrapper title={demoPagesMenu.pricingTable.text}>
			<Page>
				<div id='first' className='row scroll-margin'>
					<div className='col-md-3'>
						<Card stretch className='bg-transparent' shadow='none'>
							<CardBody>
								<div className='h-100 d-flex align-items-center justify-content-center'>
									<div className='row text-center'>
										<div className='col-12 text-uppercase fw-light'>
											Per Month
										</div>
										<div className='col-12 text-uppercase h2 fw-bold mb-2'>
											Select Your Perfect Plan
										</div>
										<div className='col-12 mb-2'>
											Vivamus ut magna pharetra, ultricies nunc eu, dignissim
											lorem. Proin et est nec ante ultricies dignissim sit
											amet eget libero.
										</div>
										<Icon icon='Verified' size='5x' color='info' />
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='CustomRocketLaunch' size='7x' color='info' />
									</div>
									<div className='col-12'>
										<h2>Startup Company</h2>
									</div>
									<div className='col-12'>
										<h3 className='display-1 fw-bold'>
											<span className='display-4 fw-bold'>$</span>219
											<span className='display-6'>/mo</span>
										</h3>
									</div>
									<div className='col-12'>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Exclusive
											Workspace
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Internet
											Connection
										</div>
										<div className='lead text-muted'>
											<Icon icon='Close' color='danger' /> Meeting Room
										</div>
										<div className='lead text-muted'>
											<Icon icon='Close' color='danger' /> Small Rest Room
										</div>
									</div>
									<div className='col-12'>
										<p>Lorem ipsum dolor sit amet.</p>
									</div>
									<div className='col-12'>
										<Button
											color='info'
											isLight
											className='w-100 py-3 text-uppercase'
											size='lg'
											onClick={() => {
												setPlanCode('startup_company');
												setModalStatus(true);
												
											}}
											>
											Select Plan
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='Maps Home Work' size='7x' color='success' />
									</div>
									<div className='col-12'>
										<h2>Mid-Size Company</h2>
									</div>
									<div className='col-12'>
										<h3 className='display-1 fw-bold'>
											<span className='display-4 fw-bold'>$</span>339
											<span className='display-6'>/mo</span>
										</h3>
									</div>
									<div className='col-12'>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Exclusive
											Workspace
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Internet
											Connection
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Five
											Meeting Room
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Small Rest
											Room
										</div>
									</div>
									<div className='col-12'>
										<p>Lorem ipsum dolor sit amet.</p>
									</div>
									<div className='col-12'>
										<Button
											color='success'
											className='w-100 py-3 text-uppercase'
											size='lg'
											onClick={() => {
												setPlanCode('mid_size_company');
												setModalStatus(true);
											}}>
											Select Plan
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='CustomFactory' size='7x' color='info' />
									</div>
									<div className='col-12'>
										<h2>Large Company</h2>
									</div>
									<div className='col-12'>
										<h3 className='display-1 fw-bold'>
											<span className='display-4 fw-bold'>$</span>339
											<span className='display-6'>/mo</span>
										</h3>
									</div>
									<div className='col-12'>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Exclusive
											Workspace
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Internet
											Connection
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Five
											Meeting Room
										</div>
										<div className='lead'>
											<Icon icon='Done Outline' color='success' /> Large Rest
											Room
										</div>
									</div>
									<div className='col-12'>
										<p>Lorem ipsum dolor sit amet.</p>
									</div>
									<div className='col-12'>
										<Button
											color='info'
											isLight
											className='w-100 py-3 text-uppercase'
											size='lg'
											onClick={() => {
												setPlanCode('large_company');
												setModalStatus(true);
											}}>
											Select Plan
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<Modal
						setIsOpen={setModalStatus}
						isOpen={modalStatus}
						size='xl'
						titleId='add-new-card'
						isCentered>
						<ModalHeader setIsOpen={setModalStatus}>
						</ModalHeader>
						<ModalBody>
							<div className='row'>
								<div className='col-md-12'>
									<ReactCreditCards
										cvc={formik.values.cvc}
										expiry={formik.values.expiry}
										name={`${formik.values.first_name} ${formik.values.last_name}`}
										number={formik.values.number
											.toString()
											.replace(/\d(?!(\d*)$)/g, '*')}
										preview
										issuer={Payment.fns.cardType(formik.values.number)}
										focused={focused}
									/>
									<form className='row g-4' noValidate onSubmit={formik.handleSubmit}>
										<FormGroup className='col-12' id='first_name' label='First Name'>
											<Input
												placeholder='First Name'
												autoComplete='ccName'
												onChange={formik.handleChange}
												value={formik.values.first_name}
												onFocus={handleInputFocus}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.first_name}
												invalidFeedback={formik.errors.first_name}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup className='col-12' id='last_name' label='Last Name'>
											<Input
												placeholder='Last Name'
												autoComplete='ccName'
												onChange={formik.handleChange}
												value={formik.values.last_name}
												onFocus={handleInputFocus}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.last_name}
												invalidFeedback={formik.errors.last_name}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup className='col-6' id='number' label='Credit Card Number'>
											<Input
												type='text'
												mask={
													Payment.fns.cardType(formik.values.number) === 'amex'
														? '9999 999999 99999'
														: '9999 9999 9999 9999'
												}
												maskChar='_'
												autoComplete='cc-number'
												placeholder='Digit Numbers'
												required
												onChange={formik.handleChange}
												value={formik.values.number}
												onFocus={handleInputFocus}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.number}
												invalidFeedback={formik.errors.number}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup className='col-3' id='cvc' label='CVC Number'>
											<Input
												type='number'
												autoComplete='cc-csc'
												placeholder='CVC Number'
												required
												onChange={formik.handleChange}
												value={formik.values.cvc}
												onFocus={handleInputFocus}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.cvc}
												invalidFeedback={formik.errors.cvc}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup className='col-3' id='expiry' label='Expiry'>
											<Input
												type='text'
												autoComplete='cc-exp'
												placeholder='MM/YY'
												mask='99/99'
												required
												onChange={formik.handleChange}
												value={formik.values.expiry}
												onFocus={handleInputFocus}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.expiry}
												invalidFeedback={formik.errors.expiry}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<div className='col'>
											<Button
												type='submit'
												color='info'
												icon='Save'
												onClick={() => {
													if(formik.values.first_name != "" && formik.values.last_name != "" && formik.values.number != "" && formik.values.expiry != "" && formik.values.cvc != ""){
														setSubscription(formik.values, planCode, account_id, account_code, email);
														setModalStatus(false);
													}
													else{
														showNotification('Subscription', 'Please fill in the empty fields.', 'warning');
														setModalStatus(true);
													}
												}}
											>Save
											</Button>
										</div>
									</form>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default PricingTablePage;
