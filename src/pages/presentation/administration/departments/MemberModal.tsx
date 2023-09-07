import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, {
	CardBody
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import { addMemberToDeptoOAuth, getUsersOAuth } from '../../../../helpers/requests';
import { IUserInfo, IUserProfile } from '../../../../common/data/invoicesInterface';
import Icon from '../../../../components/icon/Icon';

interface IMemberModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
    setUpdateTable(...args: unknown[]): unknown;
    usersRol: IUserInfo[];
    depto_id: string | undefined;
}
const MemberModal: FC<IMemberModalProps> = ({ isOpen, setIsOpen, setUpdateTable, usersRol, depto_id }) => {
    const [users, setUsers] = useState<IUserProfile[]>([]);

    const formik = useFormik({
		initialValues: {
			searchInput: '',
			user: Object.keys(users).map((i: any) => users[i].name)
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = users.filter(
		(f) =>
			// name
			f.given_name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) ||
			f.family_name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
	);

    useEffect(() => {
		getUsersOAuth().then(response => {
			if(!response.err){
				setUsers(response);
			}
			else{
				console.log(`error: ${response}`);
			}
		});

        console.log(usersRol);
	}, []);

    const addUser = async(user_id: string, depto_id: string) => {
        addMemberToDeptoOAuth(user_id, depto_id).then(response => {
            if(!response.err){
                setUpdateTable(user_id);
				showNotification('Added Successfully', 'User has been added successfully.', 'success');
                setIsOpen(false);
            }
            else{
                console.log(`error: ${response.statusText}`);
            }
        });
	}

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isScrollable={true}>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle
                    id='user'
                    className='h2'>
                    Add User
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-5'>
                <div className='row g-4'>
                    <Card>
                        <CardBody>
                            <div className='d-flex justify-content-start'>
                                <label
                                    className='border-0 bg-transparent cursor-pointer me-0'
                                    htmlFor='searchInput'>
                                    <Icon icon='Search' size='2x' color='primary' />
                                </label>
                                <Input
                                    id='searchInput'
                                    type='search'
                                    className='border-0 shadow-none bg-transparent'
                                    placeholder='Search User...'
                                    onChange={formik.handleChange}
                                    value={formik.values.searchInput}
                                />
                            </div>
                        </CardBody>
                    </Card>
                    <table className='table table-modern table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(user => (
                                <tr key={user.user_id}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='user-avatar'>
                                                <img
                                                    srcSet={user.picture}
                                                    src={user.picture}
                                                    alt='Avatar'
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6 fw-bold'>
                                                    {user.given_name} {user.family_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button
                                            icon='AddCircle'
                                            size='lg'
                                            onClick={() => {
                                                if (depto_id != undefined && depto_id != null) {
                                                    const deptoId = (depto_id.split('-'))[1];
                                                    addUser(user.user_id, deptoId);
                                                }
                                            }}>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </ModalBody>
        </Modal>
    );
};
MemberModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
    setUpdateTable: PropTypes.func.isRequired,
    usersRol: PropTypes.any.isRequired,
    depto_id: PropTypes.string.isRequired
};

export default MemberModal;
