import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import { createUserOAuth, editValues, updateUserOAuth } from '../../../../helpers/requests';
import { IEditUser } from './Users';

const validate = (values: {
    name: string;
    last_name: string;
    email: string;
    password: string
}) => {
    const errors: {
        name: string;
        last_name: string;
        email: string;
        password: string
    } = {
        name: '',
        last_name: '',
        email: '',
        password: ''
    };
    if(!values.name){
        errors.name = 'Required';
    }

    if(!values.last_name){
        errors.last_name = 'Required';
    }

    if(!values.email){
        errors.email = 'Required';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Not a valid email';
    }

    if(!values.password){
        errors.password = 'Required';
    } else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{12,25}$/.test(values.password)){
        errors.password = 'Invalid password'
    }

    return errors;
}

interface IUserEditModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
    setUpdateTable(...args: unknown[]): unknown;
    editUser: IEditUser;
}
const UserEditModal: FC<IUserEditModalProps> = ({ isOpen, setIsOpen, setUpdateTable, editUser }) => {

	const formik = useFormik({
		initialValues: {
            name: editUser.user.name,
            last_name : editUser.user.last_name,
            email: editUser.user.email,
            password: editUser.user.password
        },
        validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
		},
        enableReinitialize: true
	});

    const createUser = (values: any) => {
        if(values.email != '' && values.name != '' && values.last_name != '' && values.password != '' && !formik.errors.name && !formik.errors.last_name && !formik.errors.email && !formik.errors.password){
            createUserOAuth(
                values.email,
                values.name,
                values.last_name,
                values.password
            ).then(response => {
                if(!response.err){
                    showNotification('Created Successfully', 'User has been created successfully.', 'success');
                    setUpdateTable(values.email);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            last_name: '',
                            email: '',
                            password: ''
                        }
                    });
                }
                else{
                    const code = response.status;

                    switch (code) {
                        case 409:
                            setIsOpen(true);
                            showNotification('Create User', 'User already exists.', 'warning');
                            break;
                        default:
                            console.log(`error: ${response.statusText}`);
                            console.log(`error: ${response.status}`);
                            showNotification('Create User', 'An error occurred, please try again later.', 'warning');
                            break;
                    }
                }
            });
        }
        else{
            setIsOpen(true);
            showNotification('Create User', 'Invalid fields.', 'warning');
        }
    }

    const updateUser = (values: any, user_id: string) => {
        const info_user: editValues = {}

        if(values.email != '' && values.email != editUser.user.email){
            info_user.email = values.email;
        }

        if(values.name != '' && values.name != editUser.user.name){
            info_user.given_name = values.name;
        }

        if(values.last_name != '' && values.last_name != editUser.user.last_name){
            info_user.family_name = values.last_name;
        }

        if(values.password != '' && values.password != editUser.user.password){
            info_user.password = values.password;
        }
    
        if(info_user.given_name || info_user.family_name || info_user.email || info_user.password){
            updateUserOAuth(user_id, info_user).then(response => {
                if(!response.err){
                    showNotification('Updated Successfully', 'User has been updated successfully.', 'success');
                    setUpdateTable(user_id);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            last_name: '',
                            email: '',
                            password: ''
                        }
                    });
                }
                else{
                    const code = response.status;

                    switch (code) {
                        case 404:
                            setIsOpen(true);
                            showNotification('Update User', 'User not found.', 'warning');
                            break;
                        case 400:
                            console.log(`error: ${response.statusText}`);
                            console.log(`error: ${response.status}`);
                            setIsOpen(true);
                            showNotification('Update User', 'Cannot update password and email simultaneously.', 'warning');
                            break;
                        default:
                            console.log(`error: ${response.statusText}`);
                            console.log(`error: ${response.status}`);
                            showNotification('Update User', 'An error occurred, please try again later.', 'warning');
                            break;
                    }
                }
            })
        }
        else{
            showNotification('Update User', 'You have not provided any mods to this user.', 'warning');
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle 
                    id='user' 
                    className='h2'>
                        {editUser.type == "edit" 
                            ? `${editUser.user.name} ${editUser.user.last_name}` 
                            : 'New User'
                        }
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-5'>
                <div className='row g-4'>
                    <Card className='shadow-3d-container'>
                        <CardHeader>
                            <CardLabel icon='AccountCircle'>
                                <CardTitle>Personal Information</CardTitle>
                            </CardLabel>
                        </CardHeader>
                        <CardBody>
                            <div className='row g-4'>
                                <FormGroup id='name' label='Name' className='col-md-6'>
                                    <Input
                                        type='text'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        isTouched={formik.touched.name}
                                        placeholder='Name'
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.name}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                <FormGroup id='last_name' label='Last Name' className='col-md-6'>
                                    <Input 
                                        type='text' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.last_name} 
                                        onBlur={formik.handleBlur}
                                        isTouched={formik.touched.last_name}
                                        placeholder='Last Name'
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.last_name}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                <FormGroup id='email' label='Email' className='col-md-6'>
                                    <Input 
                                        type='text' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.email} 
                                        onBlur={formik.handleBlur}
                                        isTouched={formik.touched.email}
                                        placeholder='Email'
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.email}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                <FormGroup id='password' label='Password' className='col-md-6'>
                                    <Input
                                        type='text'
                                        placeholder='Password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        isTouched={formik.touched.password}
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.password}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                <div className='col-md-6'></div>
                                <div className='col-md-6'>
                                    <div>
                                        Your password must contain:
                                        <ul>
                                            <li>At least 12 characters</li>
                                            <li>Lower case letters (a-z)</li>
                                            <li>Upper case letters (A-Z)</li>
                                            <li>Numbers (0-9)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button 
                    color='info' 
                    onClick={() => {
                        if(editUser.type == "edit" && editUser.user.user_id){
                            updateUser(formik.values, editUser.user.user_id);
                        }
                        else{
                            createUser(formik.values);
                        }
                    }}
                    >
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};
UserEditModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
    setUpdateTable: PropTypes.func.isRequired,
    editUser: PropTypes.any.isRequired
};

export default UserEditModal;
