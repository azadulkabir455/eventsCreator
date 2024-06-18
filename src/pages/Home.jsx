import React, { useEffect, useState } from 'react';
import Banner from '../component/globalcomponent/Banner';
import Event from '../component/globalcomponent/Events';
import Loader from '../component/globalcomponent/Loader';
import { Search, XCircle } from "feather-icons-react";

import DatePicker from "react-datepicker";
import useEvents from "../hooks/useEvents";

export default function Home() {
    // State for filtering and show more data
    const [titleFilter, setTitleFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [filterIconShow, setFilterIconShow] = useState(true);
    const [filterType, setFilterType] = useState("title");
    const [filterData, setFilterData] = useState([]);
    const [showMoreEvents, setShowMoreEvents] = useState(6);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [isLoading, events] = useEvents();


    // Funciton for change input by selecting it's type
    const filterInputHandler = () => {
        switch (filterType) {
            case 'title':
                return <input type="email" class="form-control" placeholder="Search by title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />;
            case 'location':
                return <input type="email" class="form-control" placeholder="Search by location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />;
            case 'date':
                return <DatePicker
                    placeholderText="Search by date"
                    className="form-control daterange"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(value) => {
                        setDateRange(value);
                    }}
                    isClearable={true}
                />;
            default:
                break;
        }
    };

    // function for filtering data by date range
    const filterEventsByDate = (events, startDate, endDate) => {
        if (!startDate || !endDate) return events;

        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();

        return events.filter(event => {
            const eventStartDate = event.startdate ? new Date(event.startdate.seconds * 1000).getTime() : null;
            const eventEndDate = event.enddate ? new Date(event.enddate.seconds * 1000).getTime() : null;
            return (eventStartDate && eventStartDate <= endTimestamp) && (eventEndDate && eventEndDate >= startTimestamp);
        });
    };

    // Function for trigering filtering data
    const filterEventsHandler = () => {
        let filteredEvents = events;

        if (filterType === 'title') {
            filteredEvents = events.filter(event =>
                event.title?.toLowerCase().includes(titleFilter.toLowerCase())
            );
        } else if (filterType === 'location') {
            filteredEvents = events.filter(event =>
                event.location?.toLowerCase().includes(locationFilter.toLowerCase())
            );
        } else if (filterType === 'date' && startDate && endDate) {
            filteredEvents = filterEventsByDate(events, startDate, endDate);
        }

        setFilterData(filteredEvents);
        setFilterIconShow(false);
    };

    const clearFilterEventsHandler = () => {
        setFilterData(events);
        setShowMoreEvents(6);
        setTitleFilter("");
        setLocationFilter("");
        setFilterIconShow(true);
    };

    // funciton for load more data
    const showMoreEventsHandler = () => {
        setShowMoreEvents(prev => prev + 6);
    };
    const loadMoreButtonHandler = () => {
        if (filterData?.length > showMoreEvents && filterData?.length >= 6) {
            return (
                <button className='btn btn-lg btn-secondary mt-5 rounded-1 d-block mx-auto w-25 fw-medium' onClick={showMoreEventsHandler}>
                    Load More
                </button>
            );
        } else if (filterData?.length == 0 || filterData?.length < 6) {
            return null;
        } else {
            return (
                <button className='btn btn-lg btn-secondary mt-5 rounded-1 d-block mx-auto w-25 fw-medium' disabled>
                    No More Data
                </button>
            );
        }
    };

    useEffect(() => {
        setFilterData(events);
    }, [events]);

    useEffect(() => {
        loadMoreButtonHandler();
    }, [filterData]);

    return (
        <>
            <div className="container p-0">
                <Banner title={"Transforming Ideas into Actions."} />
                <div className="filterArea px-3 py-4 px-md-5 py-md-4 shadow rounded-1 mx-auto position-relative z-index-2">
                    <div className="filters d-flex p-2 bg-white rounded-1 shadow-none">
                        <div className="filterType">
                            <select class="form-select" aria-label="Default select example" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="title">Title</option>
                                <option value="location">Location</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <div className="filter">
                            {
                                filterInputHandler()
                            }
                        </div>
                        {
                            filterIconShow ?
                                <Search role="button" onClick={filterEventsHandler} size={18} color="#343F52" className="align-self-center mx-2" /> :
                                <XCircle role="button" onClick={clearFilterEventsHandler} size={18} color="#343F52" className="align-self-center mx-2" />
                        }
                    </div>
                </div>
            </div>
            <div className="container spacing">
                {
                    isLoading ? <Loader /> :
                        <div>
                            <div className="row g-4 g-xl-5">
                                {
                                    filterData?.slice(0, showMoreEvents).map((event) =>
                                        <div className="col-12 col-lg-4">
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
                            {
                                loadMoreButtonHandler()
                            }
                        </div>



                }

            </div>
        </>
    );
}
