import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DatePickerProps = {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

// https://mui.com/x/react-date-pickers/lifecycle/#lifecycle-on-simple-fields
export default function BasicDatePicker({label, value, onChange}: DatePickerProps) {

  return (
        <DemoContainer components={['DatePicker']}>
            <DatePicker label={label} value={value} onChange={onChange} />
        </DemoContainer>
  );
}