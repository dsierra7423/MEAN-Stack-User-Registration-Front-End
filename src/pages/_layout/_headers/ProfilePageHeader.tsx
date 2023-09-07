import React, { useContext } from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Avatar from '../../../components/Avatar';
import UserImage2Webp from '../../../assets/img/wanna/wanna1.webp';
import UserImage2 from '../../../assets/img/wanna/wanna1.png';
import CommonHeaderRight from './CommonHeaderRight';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';

const ProfilePageHeader = () => {
	const { dataUserProfile } = useContext(AuthContext);
	
	return (
		<Header>
			<HeaderLeft>
				<div className='col d-flex align-items-center'>
					<div className='me-3'>
						{dataUserProfile.picture
							?<Avatar
								srcSet={dataUserProfile.picture}
								src={dataUserProfile.picture}
								size={48}
								color='primary'
							/>
							: <Spinner color="info" isGrow={false} isSmall={true}/>
						}
					</div>
					<div>
						<div className='fw-bold fs-6 mb-0'>{dataUserProfile.name ? dataUserProfile.name : ''}</div>
					</div>
				</div>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default ProfilePageHeader;
