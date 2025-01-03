import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export const DateRangeCalendars = () => {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);

  return (
    <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
        <DemoItem label="Controlled picker" component="DateRangePicker">
            <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            />
        </DemoItem>
    </DemoContainer>
  );
}