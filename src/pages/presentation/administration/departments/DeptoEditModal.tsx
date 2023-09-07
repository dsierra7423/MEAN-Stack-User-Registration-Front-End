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
import { createDepartmentOAuth, editDepto, updateDepartmentOAuth } from '../../../../helpers/requests';
import { IEditDepto } from './Departments';

const validate = (values: {
    name: string;
    display_name: string;
}) => {
    const errors: {
        name: string;
        display_name: string;
    } = {
        name: '',
        display_name: ''
    };
    if(!values.name){
        errors.name = 'Required';
    } else if(!/^[a-z0-9_-]{3,50}$/.test(values.name)){
        errors.name = 'Invalid name'
    }

    if(!values.display_name){
        errors.display_name = 'Required';
    }

    return errors;
}

interface IDeptoEditModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
    setUpdateTable(...args: unknown[]): unknown;
    editDepto: IEditDepto;
}
const DeptoEditModal: FC<IDeptoEditModalProps> = ({ isOpen, setIsOpen, setUpdateTable, editDepto }) => {

	const formik = useFormik({
		initialValues: {
            name: editDepto.depto.name,
            display_name : editDepto.depto.display_name,
        },
        validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
		},
        enableReinitialize: true
	});

    const createDepto = (values: any) => {
        if(values.name != '' && values.display_name != '' && !formik.errors.name && !formik.errors.display_name){
            createDepartmentOAuth(values.name, values.display_name).then(response => {
                if(!response.err){
                    showNotification('Created Successfully', 'Department has been created successfully.', 'success');
                    setUpdateTable(values.name);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            display_name: ''
                        }
                    });
                }
                else{
                    const code = response.status;

                    switch (code) {
                        case 409:
                            console.log(response.message);
                            setIsOpen(true);
                            showNotification('Create Department', 'An organization with this name already exists.', 'warning');
                            break;
                        default:
                            console.log(`error: ${response.statusText}`);
                            console.log(`error: ${response.status}`);
                            showNotification('Create Department', 'An error occurred, please try again later.', 'warning');
                            break;
                    }
                }
            });
        }
        else{ 
            setIsOpen(true);
            showNotification('Create Department', 'Invalid fields.', 'warning');
        }
    }

    const updateDepto = (values: any, depto_id: string) => {
        const depto_info: editDepto = {}

        if(values.name != '' && values.name != editDepto.depto.name){
            depto_info.name = values.name;
        }

        if(values.display_name != '' && values.display_name != editDepto.depto.display_name){
            depto_info.display_name = values.display_name;
        }

        if(depto_info.name || depto_info.display_name){
            updateDepartmentOAuth(depto_id, depto_info).then(response => {
                if(!response.err){
                    showNotification('Updated Successfully', 'Department has been updated successfully.', 'success');
                    setUpdateTable(depto_id);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            display_name: ''
                        }
                    });
                }
                else{
                    console.log(`error: ${response.statusText}`);
                    console.log(`error: ${response.status}`);
                    showNotification('Update Department', 'An error occurred, please try again later.', 'warning');
                }
            })
        }
        else{
            showNotification('Update Department', 'You have not provided any mods to this department.', 'warning');
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle 
                    id='department' 
                    className='h2'>
                        {editDepto.type == "edit" 
                            ? editDepto.depto.display_name
                            : 'New Department'
                        }
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-5'>
                <div className='row g-4'>
                    <Card className='shadow-3d-container'>
                        <CardHeader>
                            <CardLabel icon='Business'>
                                <CardTitle>Department Information</CardTitle>
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
                                <FormGroup id='display_name' label='Display Name' className='col-md-6'>
                                    <Input 
                                        type='text' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.display_name} 
                                        onBlur={formik.handleBlur}
                                        isTouched={formik.touched.display_name}
                                        placeholder='Display Name'
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.display_name}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                                <div className='col-md-6'>
                                    <div>
                                        Name must contain:
                                        <ul>
                                            <li>At least 3 characters</li>
                                            <li>Lowercase characters, '-', and '_', and start with a letter or number</li>
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
                        if(editDepto.type == "edit" && editDepto.depto.id){
                            updateDepto(formik.values, editDepto.depto.id);
                            console.log('update rol');
                        }
                        else{
                            console.log('create');
                            createDepto(formik.values);
                        }
                    }}
                    >
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};
DeptoEditModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
    setUpdateTable: PropTypes.func.isRequired,
    editDepto: PropTypes.any.isRequired
};

export default DeptoEditModal;
