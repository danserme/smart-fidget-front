import React, { useState } from "react";
import DayPicker from "./DayPicker";

export default function Calendar() {
    const [selectDate, setDateValue] = useState('');

  return (
    <div className="flex w-full h-fit mx-auto divide-x-2 gap-10 h-screen item-center">
      <DayPicker onDateChange={setDateValue} />
      <div className="px-5">
        {/* make a component of history */}
        <h1 className="font-bold">{selectDate}</h1>
        {/* make a component for logged item */}
        <h2 className="font-semibold">Time</h2>
        <p>Details</p>
      </div>
    </div>
  );
}