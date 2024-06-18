import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleEventQuery } from '../store/feature/EventSlice';

import Event from '../component/globalcomponent/Events';
import Loader from '../component/globalcomponent/Loader';

export default function SingleEvent() {
  const { id } = useParams();
  const { data: event, isLoading } = useGetSingleEventQuery(id);
  console.log(event, "event");
  return (
    <>
      <div className="container pb-5">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            {
              isLoading ? <Loader /> :
                <Event
                  id={event?.id}
                  eventImg={event?.eventImg}
                  userInfo={event?.userInfo}
                  title={event?.title}
                  description={event?.description}
                  startDate={event?.startdate}
                  endDate={event?.enddate}
                  location={event?.location}
                  createdAt={event?.createdAt}
                  interestedCount={event?.interestedCount}
                />
            }

          </div>
        </div>
      </div>
    </>
  );
}
