import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './_request-form.scss';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Label, FormGroup } from 'reactstrap';
import CustomInput from './CustomInput';
import CustomMakeSelectInput from './CustomMakeSelectInput';
import CustomModelSelectInput from './CustomModelSelectInput';
import PropTypes from 'prop-types';

const initialState = {
    make: '',
    model: '',
    year: '',
    name: '',
    email: '',
};

Yup.addMethod(Yup.string, 'makeSelected', function () {
    return this.test({
        name: 'make',
        message: 'You must select a vehicle make.',
        test: (value) => {
            try {
                return value !== '--';
            } catch (error) {
                return false;
            }
        },
    });
});

const RequestForm = ({ labels }) => {
    // const [selectedMake, setSelectedMake] = useState('');
    const [modelsForMake, setModelsForMake] = useState([]);

    const handleMakeInputChange = (make) => {
        fetch(`http://localhost:8080/api/vehicle/${make}`)
        .then((res) => res.json())
        .then((models) => setModelsForMake(models))
        .catch((err) => console.error(err));
    };

    return (
        <Fragment>
            <Formik initialValues={ initialState }
                onSubmit={ (values, actions) => {
                    const requestPost = {
                        ...values,
                        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                        year: String(values.year),
                    };

                    fetch('http://localhost:8080/api/request', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestPost),
                    })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.error(err));

                    actions.setSubmitting(false);
                    actions.resetForm();
                } }
                validationSchema={ Yup.object().shape({
                    make: Yup.string().makeSelected()
                    .required('Required'),
                    model: Yup.string().required('Required'),
                    year: Yup.number().integer()
                    .min(1920)
                    .max(new Date().getFullYear() + 1)
                    .required('Required'),
                    name: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid Email')
                    .required('Required'),
                }) }>
                {
                    ({ isSubmitting, handleReset, setFieldValue }) => (
                        <Fragment>
                            <Form>
                                <FormGroup>
                                    <Label className="input-label" for="make">{labels.make}</Label>
                                    <div />
                                    <Field name="make" component={ CustomMakeSelectInput } onChange={ (e) => {
                                        if (e.target.value !== '--') {
                                            handleMakeInputChange(e.target.value);
                                        }
                                        setFieldValue('make', e.target.value);
                                    } } />
                                </FormGroup>

                                { modelsForMake.length ?
                                    <FormGroup>
                                        <Label className="input-label" for="model">{labels.model}</Label>
                                        <div />
                                        <Field name="model" component={ CustomModelSelectInput } models={ modelsForMake } />
                                    </FormGroup> :
                                    null}

                                <FormGroup>
                                    <Label className="input-label" for="year">{labels.year}</Label>
                                    <Field name="year" type="number" component={ CustomInput } />
                                </FormGroup>

                                <FormGroup>
                                    <Label className="input-label" for="name">{labels.name}</Label>
                                    <Field name="name" type="text" component={ CustomInput } />
                                </FormGroup>

                                <FormGroup>
                                    <Label className="input-label" for="email">{labels.email}</Label>
                                    <Field name="email" type="email" component={ CustomInput } />
                                </FormGroup>

                                <div className="row top-buffer">
                                    <div className="col-md-2 form-container">
                                        <Button color="secondary" type="reset" onClick={ handleReset }>{labels.reset}</Button>
                                    </div>

                                    <div className="col-md-2 form-container">
                                        <Button color="success" type="submit" disabled={ isSubmitting }>{labels.submit}</Button>
                                    </div>
                                </div>

                            </Form>
                        </Fragment>
                    )
                }
            </Formik>
        </Fragment>);
};

export default RequestForm;

RequestForm.propTypes = {
    labels: PropTypes.object,
};

