import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DatePickerProps = {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  reservedDates: Dayjs[];
}

// https://mui.com/x/react-date-pickers/lifecycle/#lifecycle-on-simple-fields
export default function BasicDatePicker({label, value, onChange, reservedDates}: DatePickerProps) {

  //function to disable reserved dates
  //shouldDisableDate function expects a date as an input. The DatePicker component generates a grid of calendar dates, and automatically passes each date displayed in the calendar as an argument to this function
  const shouldDisableDate = (date: Dayjs | null) => {
    if(!date){
      return false;
    }

    //compare the provided date with dates in reservedDates array
    return reservedDates.some(reservedDate => date.isSame(reservedDate, "day")); // isSame method comes from dayjs, use to check if the date is the same as the reservedDate 
  }
  return (
        <DemoContainer components={['DatePicker']}>
            <DatePicker 
              label={label} 
              value={value} 
              onChange={onChange} 
              shouldDisableDate={shouldDisableDate}
              slotProps={{
                day: {
                  sx: {
                    '&.Mui-disabled': {
                      cursor: 'not-allowed !important', // Disable cursor
                      color: 'gray', // Optional: Change disabled text color
                      backgroundColor: '#f0f0f0', // Optional: Change background for clarity
                    },
                  },
                },
              }}
            />
        </DemoContainer>
  );
};