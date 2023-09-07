import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';
import * as auth0 from 'auth0-js';
import { getToken } from '../helpers/helpers';
import { setUserProfile } from '../helpers/requests';


interface IUserProfile {
	created_at?: string,
	email: string,
	email_verified: true,
	family_name?: string,
	given_name?: string,
	identities: [],
	locale?: string,
	name: string,
	nickname: string,
	picture: string,
	updated_at: string,
	user_id: string,
	user_metadata?: any,
	last_ip?: string,
	last_login?: string,
	logins_count?: number
}

export interface IAuthContextProps {
	user: string;
	setUser?(...args: unknown[]): unknown;
	userData: Partial<IUserProps>;
	dataUserProfile: Partial<IUserProfile>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});
	const [dataUserProfile, setDataUserProfile] = useState<Partial<IUserProfile>>({});

	//---------------------------------------------------Params Auth0---------------------------------------------
	let auth: auth0.WebAuth;
    let authOptions: auth0.AuthOptions;

    authOptions = {
        domain: String(import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN),
        clientID: String(import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID),
        responseType: String(import.meta.env.VITE_REACT_APP_API_RESPONSE_TYPE),
        redirectUri: String(import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL),
    };

    auth = new auth0.WebAuth(authOptions);

	//---------------------------------------------------get Profile---------------------------------------------
	const dataHash: string = String(window.location.hash);
	const access_token = getToken(dataHash);

	useEffect(() => {
		if(access_token != '' && access_token != null){
			auth.client.userInfo(access_token, function (err:any, user:any) {
				if (err) {
					console.log('Error extracting user information: ' + err.description);
				}
				else {
					console.log('con token');
					const user_id = user.sub;
					const user_name = user.name;
					const user_email = user.email;

					setUserProfile(user_id, user_name, user_email, user).then(response => {
						setDataUserProfile(response);

						const dataProfile: string = JSON.stringify(response)
						localStorage.setItem('user_profile', dataProfile);
					});
				}
			});
		}
		else{
			console.log('There is no access token or access token expired');

			let userProfile = localStorage.getItem('user_profile');
			const profile = userProfile != null && userProfile != '' ? JSON.parse(userProfile) : {};
			setDataUserProfile(profile);
		}
		
	}, []);
	//-----------------------------------------------------------------------------------------------------------

	useEffect(() => {
		localStorage.setItem('facit_authUsername', user);
	}, [user]);

	useEffect(() => {
		if (user !== '') {
			setUserData(getUserDataWithUsername(user));
		} else {
			setUserData({});
		}
	}, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			userData,
			dataUserProfile
		}),
		[user, userData, dataUserProfile],
	);

	
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
