import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Inputs from './formelements/Inputs';
import Textarea from './formelements/TextArea';
import FileInputs from './formelements/FileInputs';
import DatePicker from './formelements/DatePicker';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MapPin, Edit3 } from "feather-icons-react";

import { serverTimestamp } from "firebase/firestore";
import useCurrentUser from '../hooks/useCurrentUser';
import { useAddEventsMutation, useUpdateEventsMutation } from "../store/feature/EventSlice";

function AddEventForm(props) {
    const [url, setUrl] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const { prefillData, handleClose } = props;
    const navigate = useNavigate();

    const [addItem] = useAddEventsMutation();
    const [updateItem] = useUpdateEventsMutation();
    const [currentUserInfo] = useCurrentUser();

    // Fucntion for getting image url by props
    const getImageUrlHandler = (url) => {
        setUrl(url);
    };

    const initialValues = {
        title: '',
        description: '',
        startdate: '',
        enddate: '',
        location: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title required'),
        description: Yup.string()
            .required('Description required'),
        startdate: Yup.date()
            .required('Start date required'),
        enddate: Yup.date()
            .required('End date required'),
        location: Yup.string()
            .required('Location required'),

    });

    const onSubmit = async values => {
        setIsAdding(true);
        try {
            if (prefillData) {
                await updateItem({
                    id: prefillData.id,
                    ...values,
                    eventImg: url,
                }).then(() => {
                    toast("Event updated successfully");
                    handleClose();
                    navigate("/");
                });
            } else {
                await addItem({
                    ...values,
                    eventImg: url,
                    userInfo: currentUserInfo[0],
                    createdAt: serverTimestamp(),
                    interestedCount: []
                }).then(() => {
                    toast("Event created successfully");
                    navigate("/");
                });
            }
        } catch (error) {
            console.error('Failed to process item:', error);
        } finally {
            setIsAdding(false);
        }
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <FileInputs getUrlHandler={getImageUrlHandler} />
                            </div>
                            <div className="col-12 mb-4">
                                <Inputs
                                    type='text'
                                    label='Title'
                                    name='title'
                                    placeholder="Write your title"
                                    icon={<Edit3 size={14} />}
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Textarea
                                    label='Description'
                                    name='description'
                                    placeholder="Write events description"
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <DatePicker
                                    label="Start Date :"
                                    name='startdate'
                                    placeholderText=" Start date"
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <DatePicker
                                    label="End Date :"
                                    name='enddate'
                                    placeholderText=" End date"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Inputs
                                    type='text'
                                    label='Location'
                                    name='location'
                                    placeholder="Write your location"
                                    icon={<MapPin size={14} />}
                                />
                            </div>
                        </div>
                        <button className="btn btn-lg btn-secondary btnFont text-capitalize fw-bold mt-4 w-100" type='submit'>
                            {

                                isAdding ? <span span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span> : ""
                            }
                            {
                                prefillData ? "Update event" : "Add event"
                            }
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default AddEventForm;