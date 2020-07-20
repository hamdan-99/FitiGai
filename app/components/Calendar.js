import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 4),
        addDays(new Date(), 5),
        addDays(new Date(), 8),
        addDays(new Date(), 9),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 3),
        addDays(new Date(), 6),
        addDays(new Date(), 7),
      ],
    },
  ];
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select a weekday"
      minDate={new Date()}
      filterDate={(date) => date.getDay() !== 0}
      highlightDates={highlightWithRanges}
      isClearable
      monthsShown={2}
      inline
    ></DatePicker>
  );
}
export default Calendar;
