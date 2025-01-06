import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import dayjs, {Dayjs} from 'dayjs';

//import redux selectors
import { selectCheckInDate, selectCheckOutDate, selectPrice, selectSubTotal } from '../redux/bookings/booking-selector';

//import redux actions
import { setCheckInDate, setCheckOutDate, setPrice, setTotalDays, setSubTotal, setFinalTotal } from '../redux/bookings/booking-reducer';

//import components
import BasicDatePicker from './DatePickers/BasicDatePicker'

//import material UI component
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type SetShowEditDatesProps = {
    setShowEditDates: React.Dispatch<React.SetStateAction<boolean>>;
    reservedDates: Dayjs[];
}

export const DateSelector = ({setShowEditDates, reservedDates}: SetShowEditDatesProps) => {
    const dispatch = useDispatch();

    const bookingSubTotal = useSelector(selectSubTotal);

    const serviceFee = .125;
    const taxes = .10;
    const finalCharge = bookingSubTotal + (bookingSubTotal * taxes) + (bookingSubTotal * serviceFee);

    const [stayDuration, setStayDuration] = useState<number>(0);

    const checkInDate = useSelector(selectCheckInDate);
    const checkOutDate = useSelector(selectCheckOutDate);
    const price = useSelector(selectPrice);

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

    useEffect(() => {
        if(convertedCheckInDate && convertedCheckOutDate){
            setStayDuration(convertedCheckOutDate.diff(convertedCheckInDate, "day"));
            dispatch(setPrice(price));
            dispatch(setSubTotal(price * stayDuration))
            dispatch(setTotalDays(stayDuration));
            dispatch(setFinalTotal(finalCharge))

        }
    }, [convertedCheckInDate, convertedCheckOutDate, stayDuration, price, finalCharge, dispatch]);

  return (
    <div className="flex flex-col">
        <div onClick={() => setShowEditDates(false)} className="cursor-pointer mb-2"> 
            <CloseIcon className="border rounded-full text-gray-500 hover:text-black hover:border-black"></CloseIcon>
        </div>
        
        <div className="flex">
            <div>
                <BasicDatePicker label="Check in" value={convertedCheckInDate} onChange={handleCheckInDateChange} reservedDates={reservedDates}></BasicDatePicker>
            </div>
            <div>
                <BasicDatePicker label="Check out" value={convertedCheckOutDate} onChange={handleCheckOutDateChange} reservedDates={reservedDates}></BasicDatePicker>
            </div>
        </div>

    </div>
  )
};
