import React from 'react';
import Loader from '../component/globalcomponent/Loader';
import Event from '../component/globalcomponent/Events';

import useCurrentUser from '../hooks/useCurrentUser';
import useEvents from '../hooks/useEvents';

export default function MyEvents() {
  const [currentUserInfo] = useCurrentUser();
  const [isLoading, events] = useEvents();
  const myEvents = events?.filter((event) => event.userInfo.id === currentUserInfo[0]?.id);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          <div className="row g-3 g-md-5">
            <div className="col-12 col-md-5">
              <div className="userProfile px-3 py-4 shadow ">
                <img src="https://shorturl.at/6G2B6" alt="userprofile" className='rounded-circle w-50  d-block mx-auto border border-4 border-secondary' />
                <p className='text-center text-capitalize mt-4 mb-0'>
                  {
                    currentUserInfo && currentUserInfo[0]?.name
                  }
                </p>
                <small className='d-block text-center text-primary'>
                  {
                    currentUserInfo && currentUserInfo[0]?.email
                  }
                </small>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="userEvents shadow px-3 py-4">
                {isLoading ? <Loader /> :
                  myEvents?.length === 0 ? <div className='py-5 text-center'>
                    <h1 className='fs-1 text-secondary fw-bold'>Oops</h1>
                    <p className='text-muted mt-3 fs-6'>You didn't have created event yet!</p>
                  </div> :
                    myEvents?.map((event) =>
                      <div className="mb-4">
                        <Event
                          id={event.id}
                          eventImg={event.eventImg}
                          userInfo={event.userInfo}
                          title={event.title}
                          description={event.description}
                          startDate={event.startdate}
                          endDate={event.enddate}
                          location={event.location}
                          createdAt={event.createdAt}
                          interestedCount={event.interestedCount}
                        />
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
