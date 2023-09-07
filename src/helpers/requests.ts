import showNotification from "../components/extras/showNotification";
import { helpHttp } from "./helpers";


const request = helpHttp();
const url_auth0 = String(import.meta.env.VITE_REACT_APP_AUTH0_API_MANAGEMENT);
const headers_auth0 = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};
const url_recurly = String(import.meta.env.VITE_REACT_APP_API_RECURLY);
const headers_recurly = {
    "accept": "application/json",
    "Content-Type": "application/json"
};

export const getBearerTokenAuth0 = async () => {
	const headers = {
        'accept': 'application/json'
    }

	const options = {
		method: 'POST',
		headers,
		redirect: 'follow'
	};

	return await request.post(`${url_recurly}get_token_oauth`, options).then(res => res);
}

export const getUserInfor = async (user_id: string | null) => {
    if(user_id == null) return {user_id: null};

	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

    const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    return await request.get(`${url_auth0}users/${user_id}`, options).then(res => res);
}

export const createAccountRecurly = async(code: string, email: string, name: string) => {
    const body = {
        "email": email,
        "first_name": name
    };

    const options = {
		method: 'POST',
		headers: headers_recurly,
		body,
		redirect: 'follow'
    };

    return await request.post(`${url_recurly}create_account?code=${code}`, options).then(res => res);
}

export const saveIdRecurly = async(user_id: string, id_recurly: string) => {
	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

    const body = {
        "user_metadata": {
            "id_recurly": id_recurly
        }
    };

    const options = {
        method: 'PATCH',
        headers,
        body,
        redirect: 'follow'
    };

    return await request.patch(`${url_auth0}users/${user_id}`, options).then(res => res);
}

export const createSubscription = async(plan_code: string, currency: string, account_code: string | null, email: string | null) => {
	if(account_code == null && email == null) return {"error": "account_code y email nulos"}

	const body = {
		"account": {
			"email": email
		}
	};

    const options = {
    method: 'POST',
    headers: headers_recurly,
    body,
    redirect: 'follow'
    };

	//`${url_recurly}create_new_subscription?plan_code=${plan_code}&currency=${currency}&account_code=${account_code}`

    return await request.post(
		`${url_recurly}create_new_subscription?plan_code=${plan_code}&currency=${currency}&account_code=${account_code}`, 
		options).then(res => res);
}

export const setCreditCardInfo = async(account_id: string, first_name: string, last_name: string, number: string, month: string, year: string, cvv: string) => {
	const body = {
		"first_name": first_name,
		"last_name": last_name,
		"address": {
		  "street1": "street1",
		  "street2": "street2",
		  "city": "city",
		  "region": "region",
		  "postal_code": "postal_code",
		  "country": "MX"
		},
		"number": number,
		"month": month,
		"year": year,
		"cvv": cvv
	}

    const options = {
    method: 'PUT',
    headers: headers_recurly,
    body,
    redirect: 'follow'
    };

	return await request.put(`${url_recurly}set_billing_info?account_id=${account_id}`, options).then(res => res);
}

export const getInvoices = async(account_id: string) => {
	if(account_id == null) return {"error": "No existe id del usuario"}

	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

	const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    return await request.get(`${url_recurly}list_accounts_invoices?account_id=${account_id}`, options).then(res => res);
}

export const fetchInvoice = async(invoice_id: string) => {
	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

	const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };
	
    return await request.get(`${url_recurly}fetch_invoice?invoice_id=${invoice_id}`, options).then(res => res);
}

export const getTransactions = async (account_id: string) => {
	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

	const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    return await request.get(`${url_recurly}list_account_transactions?account_id=${account_id}`, options).then(res => res);
}

export const fetchTransaction = async(transaction_id: string) => {
	const token = await getBearerTokenAuth0();

	const headers = {
		...headers_auth0,
		"Authorization": !token.err ? `${token.data.token_type} ${token.data.access_token}` : ''
	}

	const options = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };

    return await request.get(`${url_recurly}fetch_transaction?transaction_id=${transaction_id}`, options).then(res => res);
}

//-----------------------------------------------------------------------------------------------------------------------

export const setUserProfile = async(user_id: string, user_name: string, user_email: string, user_info: any) => {
	const user_info_auth = await getUserInfor(user_id);

	if(!user_info_auth.err){
		if(user_info_auth.user_metadata){
			if(user_info_auth.user_metadata.id_recurly){
				console.log('ID Recurly: ' + user_info_auth.user_metadata.id_recurly);
				return user_info_auth;
			}
		}
		else{
			//crear cuenta recurly
			const user_info_recurly = await createAccountRecurly(user_id, user_name, user_email);

			if(!user_info_recurly.err){
				if(user_info_recurly.status_code == 201){
					//guardar id_recurly en auth0
					const response = await saveIdRecurly(user_id, user_info_recurly.data.id);

					if(!response.err){
						console.log('guardado de id en auth0');
						console.log(JSON.stringify(response));
						return response;
					}
					else{
						console.log(`Error: ${response.statusText}`);
						return user_info;
					}
				}
				else{
					console.log(`Error: ${user_info_recurly.data}`);
					return user_info
				}
			}
			else{
				console.log(`Error: ${user_info_recurly.statusText}`);
				return user_info
			}
		}
	}
	else{
		console.log(`Error extracting user information:  ${user_info_auth.statusText}`);
		return user_info;	
	}
}

export const setSubscription = (values: any, plane_code: string, account_id: string | null, account_code: string | null, email: string | null) => {
	if(account_id && account_code && email != null){

		const first_name = values.first_name;
		const last_name = values.last_name;
		const number = values.number;
		const expiry = (values.expiry).split('/');
		const month = expiry[0];
		const year = expiry[1];
		const cvv = values.cvc;
		const currency = 'MXN';

		setCreditCardInfo(account_id, first_name, last_name, number, month, year, cvv).then(response => {
			if(!response.err){
				const statusCode = response.status_code;

				switch (statusCode) {
					case 200:
						createSubscription(plane_code, currency, account_code, email).then(resp  => {
							if(!resp.err){
								const code = resp.status_code;

								switch (code) {
									case 201:
										console.log(resp);
										console.log(resp.status_code);
										showNotification('Subscription', 'Transaction completed correctly.', 'success');
										break;
									case 422:
										console.log(resp);
										showNotification('Subscription', `${resp.data.error.params[0].message}`, 'warning');
										break;
								
									default:
										console.log(`Error: status_code: ${resp.status_code} ${JSON.stringify(resp.data)}`);
										showNotification('Subscription', 'An error occurred, please try again later.', 'warning');
										break;
								}
							}
							else{
								console.log(`error: ${resp.statusText}`);
								showNotification('Subscription', 'An error occurred, please try again later.', 'warning');
							}
						});
						break;
					case 422:
						console.log(response);
						showNotification('Subscription', `${response.data.error.message}`, 'warning');
						break;
					default:
						console.log(`Error: status_code: ${response.status_code} ${JSON.stringify(response.data)}`);
						showNotification('Subscription', 'An error occurred, please try again later.', 'warning');
						break;
				}
			}
			else{
				console.log(`Error: ${response.statusText}`);
				showNotification('Subscription', 'An error occurred, please try again later.', 'warning');
			}
		});
	}
	else{
		showNotification('Subscription', 'An error occurred, please try again later.', 'warning');
	}
}

export const getUserInfoRecurly = (id_account: string) => {
    //teko8e3khuoy

    const options = {
    method: 'GET',
    headers: headers_recurly,
    redirect: 'follow'
    };

    request.get(`${url_recurly}get_account?account_id=${id_account}`, options).then(res => {
        //res
        console.log(res);
        // console.log('Prueba accediendo propiedades:');
        // console.log(res.data.id);
        // console.log(res.data.last_name);
		console.log(res.status_code);
    });
}