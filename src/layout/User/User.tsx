import React, { useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { demoPagesMenu } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import AuthContext from '../../contexts/authContext';
import * as auth0 from 'auth0-js';
import Spinner from '../../components/bootstrap/Spinner';


const User = () => {
	let auth: auth0.WebAuth;
	let authOptions: auth0.AuthOptions;

	authOptions = {
		domain: String(import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN),
		clientID: String(import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID),
		responseType: String(import.meta.env.VITE_REACT_APP_API_RESPONSE_TYPE),
		redirectUri: String(import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL),
	};

	auth = new auth0.WebAuth(authOptions);
	
	const { userData, setUser, dataUserProfile } = useContext(AuthContext);

	const navigate = useNavigate();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);

	const { t } = useTranslation(['translation', 'menu']);

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					{dataUserProfile.picture
						?<img
							srcSet={dataUserProfile.picture}
							src={dataUserProfile.picture}
							alt='Avatar'
							width={128}
							height={128}
						/>
						: <Spinner color="info" isGrow={false} isSmall={true}/>
					}
				</div>
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{`${dataUserProfile.name ? dataUserProfile.name : ''}`}
						<Icon icon='Verified' className='ms-1' color='info' />
					</div>
				</div>
			</div>
			<DropdownMenu>
				<DropdownItem>
					<Button
						icon='AccountBox'
						onClick={() =>
							navigate(
								`../${demoPagesMenu.appointment.subMenu.employeeID.path}/${userData?.id}`,
							)
						}>
						Profile
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
						onClick={() => setDarkModeStatus(!darkModeStatus)}
						aria-label='Toggle fullscreen'>
						{darkModeStatus ? 'Dark Mode' : 'Light Mode'}
					</Button>
				</DropdownItem>
			</DropdownMenu>

			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() =>
								navigate(
									`../${demoPagesMenu.appointment.subMenu.employeeID.path}/${userData?.id}`,
									// @ts-ignore
									handleItem(),
								)
							}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='AccountBox' className='navigation-icon' />
									<span className='navigation-text'>
										{t('menu:Profile') as ReactNode}
									</span>
								</span>
							</span>
						</div>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{darkModeStatus
											? (t('menu:DarkMode') as ReactNode)
											: (t('menu:LightMode') as ReactNode)}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {

								localStorage.removeItem("access_token");
								localStorage.removeItem("scope");
								localStorage.removeItem("expires_in");
								localStorage.removeItem("token_type");
								localStorage.removeItem("state");
								localStorage.removeItem("id_token");
								localStorage.removeItem("user_profile");
								localStorage.removeItem('expires_at');

								auth.logout({
									returnTo: String(import.meta.env.VITE_REACT_APP_API_SERVER_URL),
									clientID: String(import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID)
								});
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>
										{t('menu:Logout') as ReactNode}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;
