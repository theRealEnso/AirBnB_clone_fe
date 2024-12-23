import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Dayjs } from 'dayjs';

type LabelProps = {
  label: string;
}

// https://mui.com/x/react-date-pickers/lifecycle/#lifecycle-on-simple-fields
export default function BasicDatePicker({label}: LabelProps) {
  const [value, setValue] = useState<Dayjs | null>(null)

  console.log(value);
  return (
        <DemoContainer components={['DatePicker']}>
            <DatePicker label={label} value={value} onChange={setValue} />
        </DemoContainer>
  );
}