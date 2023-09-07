import React, { useContext, useEffect, useState } from 'react';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import { ISubscriptions } from '../../../common/data/invoicesInterface';
import AuthContext from '../../../contexts/authContext';
import { getSubscriptions } from '../../../helpers/requests';
import showNotification from '../../../components/extras/showNotification';
import CommonGridSubscriptions from './CommonGridSubscriptions';
import Spinner from '../../../components/bootstrap/Spinner';
import { dateFormat } from '../../../helpers/helpers';


const Subscriptions = () => {
	const [subscriptions, setSubscriptions] = useState<ISubscriptions[]>([]);
	const { dataUserProfile } = useContext(AuthContext);
	const account_id = dataUserProfile.user_metadata ? dataUserProfile.user_metadata.id_recurly : null;

	useEffect(() => {
		if(account_id != null){
			getSubscriptions(account_id).then(response => {
				if(!response.err){
					const code = response.status_code;

					switch (code) {
						case 200:
							setSubscriptions(response.data.data);
							break;
					
						default:
							showNotification('Subscriptions', 'An error occurred, please try again later.', 'warning');
							console.log(`Error: ${response.data}`);
							break;
					}
				}
				else{
					showNotification('Subscriptions', 'An error occurred, please try again later.', 'warning');
					console.log(`Error: ${response.statusText}`);
				}
			});
		}
	}, [account_id]);

	return (
		<PageWrapper title={demoPagesMenu.invoicing.subMenu.subscriptions.text}>
			<Page>
				<div className='display-4 fw-bold py-3'>All Subscriptions</div>
				<div className='row'>
					{subscriptions.length > 0
						? subscriptions.map((item) => (
							<div key={item.id} className='col-xxl-3 col-xl-4 col-md-6'>
								<CommonGridSubscriptions
									id={item.id}
									name={item.plan.name}
									period={`${dateFormat(item.current_period_started_at)} - ${dateFormat(item.current_period_ends_at)}`}
									status={item.state}
									unit_amount={item.unit_amount}
									collection={item.collection_method}
									end={item.current_period_ends_at}
									start={item.current_period_started_at}
									quantity={item.quantity}
									currency={item.currency}
								/>
							</div>
						))
						: <div className='d-flex justify-content-center'>
							<Spinner color="info" isGrow={false} size={50} />
						</div>
					}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Subscriptions;
