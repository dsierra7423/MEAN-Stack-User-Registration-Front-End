import React, { FC, useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardSubTitle, CardTitle } from '../../../components/bootstrap/Card';
import { dateHourFormat, priceFormat } from '../../../helpers/helpers';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import classNames from 'classnames';

interface ICommonGridSubscriptionsProps {
	id: string;
	name: string;
	period: string;
	status: string;
	unit_amount: number;
	collection: string;
	end : string;
	start: string;
	quantity: number;
	currency: string;
}
const CommonGridSubscriptions: FC<ICommonGridSubscriptionsProps> = ({
	id,
	name,
	period,
	status,
	unit_amount,
	collection,
	end,
	start,
	quantity,
	currency
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [state, setState] = useState('info');

	useEffect(() => {
		switch (status) {
			case 'active':
				setState('success');
				break;
			case 'expired':
				setState('warning');
				break;
			case 'canceled':
				setState('danger');
				break;
			default:
				setState('info');
				break;
		}
	}, []);

	return (
		<>
			<Card>
				<CardHeader>
					<CardLabel>
						<CardTitle tag='div' className='h3'>
							<Icon
								icon='Circle'
								className={classNames(
									'navigation-notification',
									{
										[`text-${state}`]: typeof state === 'string',
										'text-danger': typeof state !== 'string',
									}
								)}
							/>
							{name}{' '}
						</CardTitle>
						<br />
						<CardSubTitle tag='div' className='h6'>
							{period}
						</CardSubTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<div className='d-flex justify-content-center fw-bold fs-1'>
						{priceFormat(unit_amount)}
					</div>
					<br />
					<div className='d-flex justify-content-center fw-bold fs-5'>
						{status == 'active' && <Icon icon='Done Outline' color='success' />}{(status).charAt(0).toUpperCase() + (status).slice(1)}
					</div>
				</CardBody>
				<CardFooter className='shadow-3d-container'>
					<Button
						color='dark'
						className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${darkModeStatus ? 'light' : 'dark'
							}`}
						size='lg'
						tag='a'
						onClick={() => {
							setModalStatus(true)
						}}
					>
						View Subscription
					</Button>
				</CardFooter>
			</Card>

			<Modal
				setIsOpen={setModalStatus}
				isOpen={modalStatus}
				size='lg'
				isCentered>
				<ModalHeader setIsOpen={setModalStatus}>
					<ModalTitle id='subscription' className='h2'>
						<Icon
							icon='Circle'
							className={classNames(
								'navigation-notification',
								{
									[`text-${state}`]: typeof state === 'string',
									'text-danger': typeof state !== 'string',
								}
							)}
						/>
						{name}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<table className='table table-modern table-hover'>
						<tr>
							<th><div className='mb-2'>Current Period:</div></th>
							<td><div className='mb-2'>{period}</div></td>
						</tr>
						<tr>
							<th><div className='mb-2'>Collection:</div></th>
							<td><div className='mb-2'>{(collection).charAt(0).toUpperCase() + (collection).slice(1)}</div></td>
						</tr>
						<tr>
							<th><div className='mb-2'>Ends on:</div></th>
							<td><div className='mb-2'>{dateHourFormat(end)}</div></td>
						</tr>
						<tr>
							<th><div className='mb-2'>Started on:</div></th>
							<td><div className='mb-2'>{dateHourFormat(start)}</div></td>
						</tr>
						<tr>
							<th><div className='mb-2'>State:</div></th>
							<td><div className='mb-2'>{status == 'active' && <Icon icon='Done Outline' color='success' />} {(status).charAt(0).toUpperCase() + (status).slice(1)}</div>
							</td>
						</tr>
						<tr>
							<th><div className='mb-2'>Quantity:</div></th>
							<td><div className='mb-2'>{quantity}</div></td>
						</tr>
						<tr>
							<th><div className='mb-2'>Total:</div></th>
							<td><div className='mb-2'>{priceFormat(unit_amount)} {currency}</div></td>
						</tr>
					</table>
				</ModalBody>
			</Modal>
		</>
		
	);
};

export default CommonGridSubscriptions;
