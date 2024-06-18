import React from 'react';
import AddEventForm from '../component/AddEventsForm';
import Banner from '../component/globalcomponent/Banner';

export default function AddEvent() {
    return (
        <div className="container">
            <Banner title="Add Your events!"/>
            <div className="row spacing">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className="userProfile px-3 py-4 shadow ">
                        <AddEventForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
