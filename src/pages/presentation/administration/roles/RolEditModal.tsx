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
import { createRolOAuth, editRol, updateRolOAuth } from '../../../../helpers/requests';
import { IEditRol } from './Roles';

const validate = (values: {
    name: string;
    description: string;
}) => {
    const errors: {
        name: string;
        description: string;
    } = {
        name: '',
        description: ''
    };
    if(!values.name){
        errors.name = 'Required';
    }

    if(!values.description){
        errors.description = 'Required';
    }

    return errors;
}

interface IRolEditModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
    setUpdateTable(...args: unknown[]): unknown;
    editRol: IEditRol;
}
const RolEditModal: FC<IRolEditModalProps> = ({ isOpen, setIsOpen, setUpdateTable, editRol }) => {

	const formik = useFormik({
		initialValues: {
            name: editRol.rol.name,
            description : editRol.rol.description,
        },
        validate,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
		},
        enableReinitialize: true
	});

    const createRol = (values: any) => {
        if(values.name != '' && values.description != '' && !formik.errors.name && !formik.errors.description){
            createRolOAuth(values.name,values.description).then(response => {
                if(!response.err){
                    showNotification('Created Successfully', 'Rol has been created successfully.', 'success');
                    setUpdateTable(values.name);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            description: ''
                        }
                    });
                }
                else{
                    console.log(`error: ${response.statusText}`);
                    console.log(`error: ${response.status}`);
                    showNotification('Create Rol', 'An error occurred, please try again later.', 'warning');
                }
            });
        }
        else{
            setIsOpen(true);
            showNotification('Create Rol', 'Invalid fields.', 'warning');
        }
    }

    const updateRol = (values: any, rol_id: string) => {
        const rol_info: editRol = {}

        if(values.name != '' && values.name != editRol.rol.name){
            rol_info.name = values.name;
        }

        if(values.description != '' && values.description != editRol.rol.description){
            rol_info.description = values.description;
        }

        if(rol_info.name || rol_info.description){
            updateRolOAuth(rol_id, rol_info).then(response => {
                if(!response.err){
                    showNotification('Updated Successfully', 'Rol has been updated successfully.', 'success');
                    setUpdateTable(rol_id);
                    setIsOpen(false);
                    formik.resetForm({
                        values: {
                            name: '',
                            description: ''
                        }
                    });
                }
                else{
                    console.log(`error: ${response.statusText}`);
                    console.log(`error: ${response.status}`);
                    showNotification('Update Rol', 'An error occurred, please try again later.', 'warning');
                }
            })
        }
        else{
            showNotification('Update Rol', 'You have not provided any mods to this rol.', 'warning');
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle 
                    id='subscription' 
                    className='h2'>
                        {editRol.type == "edit" 
                            ? editRol.rol.name
                            : 'New Rol'
                        }
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-5'>
                <div className='row g-4'>
                    <Card className='shadow-3d-container'>
                        <CardHeader>
                            <CardLabel icon='PeopleOutline'>
                                <CardTitle>Rol Information</CardTitle>
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
                                <FormGroup id='description' label='Description' className='col-md-6'>
                                    <Input 
                                        type='text' 
                                        onChange={formik.handleChange} 
                                        value={formik.values.description} 
                                        onBlur={formik.handleBlur}
                                        isTouched={formik.touched.description}
                                        placeholder='Description'
                                        isValid={formik.isValid}
                                        invalidFeedback={formik.errors.description}
                                        validFeedback='Looks good!'
                                    />
                                </FormGroup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button 
                    color='info' 
                    onClick={() => {
                        if(editRol.type == "edit" && editRol.rol.id){
                            updateRol(formik.values, editRol.rol.id);
                            console.log('update rol');
                        }
                        else{
                            createRol(formik.values);
                        }
                    }}
                    >
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};
RolEditModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
    setUpdateTable: PropTypes.func.isRequired,
    editRol: PropTypes.any.isRequired
};

export default RolEditModal;
