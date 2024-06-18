import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialShare from './SocialShare';
import AddEventForm from '../AddEventsForm';
import ModalCotainer from './ModalContainer';
import {
  Calendar,
  MapPin,
  Edit,
  Trash2,
  Star,
  Clock
} from "feather-icons-react";



import { useDeleteEventsMutation } from '../../store/feature/EventSlice';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { database } from '../../firebase_config';


export default function Event(props) {
  const {
    id,
    eventImg,
    userInfo,
    title,
    description,
    startDate,
    endDate,
    location,
    createdAt,
    interestedCount } = props;

  const [modalState, setModalState] = useState({
    showDeleteModal: false,
    showUpdateModal: false
  });
  const [prefillData, setPrefillData] = useState({
    id: "",
    eventImg: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: ""
  });
  const [interest, setInterest] = useState(interestedCount || []);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const [deleteItem] = useDeleteEventsMutation();

  const prefillDataHandler = (data) => {
    setPrefillData({
      id: data.id,
      eventImg: data.eventImg,
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location
    });
  };

  // funciton for show and hide modal
  const handleModalShow = (modal) => {
    setModalState((prevState) => ({ ...prevState, [modal]: true }));
  };

  const handleModalClose = (modal) => {
    setModalState((prevState) => ({ ...prevState, [modal]: false }));
  };

  // function for delete events

  const deleteEventHandler = () => {
    deleteItem(props.id).then(() => {
      toast("Event deleted successfully");
      handleModalClose('showDeleteModal');
    });
  };

  // Function for toggle user interest on the event

  const interestRef = doc(database, "events", props.id);
  const interestHandler = async () => {
    try {
      if (interest.includes(currentUser?.uid)) {
        await updateDoc(interestRef, { interestedCount: arrayRemove(currentUser?.uid) });
        setInterest((prevInterest) => prevInterest.filter(uid => uid !== currentUser?.uid));
        toast("You have removed interest");
      } else {
        await updateDoc(interestRef, { interestedCount: arrayUnion(currentUser?.uid) });
        setInterest((prevInterest) => [...prevInterest, currentUser?.uid]);
        toast("You have added interest");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Converted timestamps to date get from firebse
  const monthList = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const combineDate = day + " " + monthList[month] + " " + year;
    return combineDate;
  };
  const getTime = (date) => {
    const houre = date.getHours();
    const min = date.getMinutes();
    return houre + ":" + min + (houre <= 12 ? "am" : "pm");
  };

  return (
    <>
      <div className="events">
        <Link to={`/events/${id}`} className='text-decoration-none'>
          {
            eventImg ?
              <img src={eventImg} alt="events" className='object-fit-cover rounded-1' /> :
              <img src="/placeholder.jpg" alt="events" className='object-fit-cover rounded-1' />
          }
        </Link>
        <div className="eventsContent  mx-1 mx-md-3 p-4 border-top border-4 border-secondary bg-white shadow rounded-1 position-relative z-2">
          <div className="eventsMeta mb-4 d-flex justify-content-between">
            <div>
              <span className="badge bg-dark rounded-pill text-capitalize">
                {userInfo?.name}
              </span>
              <small className='mt-1 text-muted d-block d-flex align-items-center'>
                <Clock size={14} className="me-1" /> {getTime(new Date(createdAt.seconds * 1000))}
              </small>
            </div>
            <div className="actionButtons">
              {
                currentUser?.uid == userInfo.id ? <>
                  <Edit size={18} color="#60697b" className="me-2" role="button" onClick={() => [handleModalShow('showUpdateModal'), prefillDataHandler(props)]} />
                  <Trash2 size={18} color="#FF1B4F" role="button" onClick={() => handleModalShow('showDeleteModal')} />
                </> : ""
              }
            </div>
          </div>
          <Link to={`/events/${id}`} className='text-decoration-none'>
            <h2 className='text-capitalize mb-2'>{title}</h2>
          </Link>
          <p className='mb-3'>{description}</p>
          <div className="row metaData mb-4">
            <div className="col-6">
              <div className='d-flex align-items-center'>
                <Calendar size={16} color="#60697b" className="me-2" />
                <span>Start Date</span>
              </div>
              <p>{getDate(new Date(startDate.seconds * 1000))}</p>
            </div>
            <div className="col-6">
              <div className='d-flex align-items-center'>
                <Calendar size={16} color="#60697b" className="me-2" />
                <span>End Date</span>
              </div>
              <p >{getDate(new Date(endDate.seconds * 1000))}</p>
            </div>
            <div className="col-6">
              <div className='d-flex align-items-center'>
                <MapPin size={16} color="#60697b" className="me-2" />
                <span>Location</span>
              </div>
              <p>{location}</p>
            </div>
            <div className="col-6">
              <div className='d-flex align-items-center'>
                <Star size={16} color="#60697b" className="me-2" />
                <span> Interested</span>
              </div>
              <p>{interest.length} people</p>
            </div>
          </div>
          <div className="btnGroup d-flex">
            {
              currentUser ?
                <button
                  className='btn btn-lg btn-secondary rounded-1 me-2 w-100 d-flex align-items-center justify-content-center'
                  onClick={interestHandler}
                >
                  {
                    interest.includes(currentUser?.uid) ?
                      <>
                        Interested
                        <Star size={18} className="ms-2" style={{ fill: "#000" }} />
                      </> :
                      <>
                        Interest
                        <Star size={18} className="ms-2" />
                      </>
                  }
                </button> :
                <Link to="/signin" className='text-decoration-none d-block w-100 me-2'>
                  <button
                    className='btn btn-lg btn-secondary rounded-1 me-2 w-100 d-flex align-items-center justify-content-center'
                    onClick={interestHandler}
                  >
                    Interest
                    <Star size={18} className="ms-2" />
                  </button>
                </Link>
            }

            <SocialShare id={id} />
          </div>
        </div>
      </div>

      {/* Modal for delete event */}
      <ModalCotainer
        show={modalState.showDeleteModal}
        handleClose={() => handleModalClose('showDeleteModal')}
        title="Delete event"
        size='md' >
        <>
          <p>Are you sure to delete post?</p>
          <div className="mt-3">
            <button className='btn btn-mg btn-secondary me-3 rounded-1' onClick={() => handleModalClose('showDeleteModal')}>No, I don't</button>
            <button className='btn btn-mg btn-warning me-3 rounded-1 text-white' onClick={deleteEventHandler}>Yes I do</button>
          </div>
        </>
      </ModalCotainer>

      {/* Modal for update events */}
      <ModalCotainer
        show={modalState.showUpdateModal}
        handleClose={() => handleModalClose('showUpdateModal')}
        title="Update event"
        size='lg' >
        <>
          <AddEventForm
            prefillData={prefillData}
            handleClose={() => handleModalClose('showUpdateModal')} />
        </>
      </ModalCotainer>
    </>
  );
}
