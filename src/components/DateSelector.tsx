import { useSelector, useDispatch } from 'react-redux'

import dayjs, {Dayjs} from 'dayjs';

//import redux selectors
import { selectCheckInDate, selectCheckOutDate } from '../redux/bookings/booking-selector';

//import redux actions
import { setCheckInDate, setCheckOutDate } from '../redux/bookings/booking-reducer';

//import components
import BasicDatePicker from './DatePickers/BasicDatePicker'

//import material UI component
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type SetShowEditDatesProps = {
    setShowEditDates: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateSelector = ({setShowEditDates}: SetShowEditDatesProps) => {
    const dispatch = useDispatch();

    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);

    //convert date strings back to Dayjs instances
    const convertedCheckInDate = checkInDate ? dayjs(checkInDate) : null; 
    const convertedCheckOutDate = checkOutDate? dayjs(checkOutDate) : null; 

    //functions to handle user date selections

    const handleCheckInDateChange = (updatedCheckInDate: Dayjs | null) => {
        dispatch(setCheckInDate(updatedCheckInDate?.format("MM/DD/YYYY")));
    };

    const handleCheckOutDateChange = (updatedCheckOutDate: Dayjs | null) => {
        dispatch(setCheckOutDate(updatedCheckOutDate?.format("MM/DD/YYYY")));
    };

  return (
    <div className="flex flex-col">
        <div onClick={() => setShowEditDates(false)} className="cursor-pointer mb-2"> 
            <CloseIcon className="border rounded-full text-gray-500 hover:text-black hover:border-black"></CloseIcon>
        </div>
        
        <div className="flex">
            <div>
                <BasicDatePicker label="Check in" value={convertedCheckInDate} onChange={handleCheckInDateChange}></BasicDatePicker>
            </div>
            <div>
                <BasicDatePicker label="Check out" value={convertedCheckOutDate} onChange={handleCheckOutDateChange}></BasicDatePicker>
            </div>
        </div>

    </div>
  )
};
