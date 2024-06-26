import React, { useEffect, useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import dayjs from "dayjs";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function DayPicker({ onDateChange }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [recordDates, setRecordDates] = useState(null);

  useEffect(() => {
    onDateChange(selectDate.toDate().toDateString());
  }, [selectDate, onDateChange]);

  return (
    <div className="w-96 h-96">
        <div className="flex justify-between">
            <h1 className="font-semibold">{months[today.month()]}, {today.year()}</h1>
            <div className="flex items-center gap-5">
            <GrFormPrevious className="w-5 h-5 cursor-pointer" onClick={() => {
                setToday(today.month(today.month() - 1))
            }} />
            <h1 className="cursor-pointer" onClick={() => {
                setToday(currentDate);
                setSelectDate(currentDate);
            }} >Today</h1>
            <GrFormNext className="w-5 h-5 cursor-pointer" onClick={() => {
                setToday(today.month(today.month() + 1))
            }} />
            </div>
        </div>
        <div className="w-full grid grid-cols-7 text-gray-600">
            {days.map((day, index) => {
            return <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
            })}
        </div>
        <div className="w-full grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(({ date, currentMonth, today, hasData }, index) => {
            return (
                <div key={index} className="h-14 border-t grid place-content-center text-sm">
                <h1 className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "border border-indigo-400" : "",
                    hasData ? "border border-indigo-400" : "",
                    selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-indigo-400 text-white" : "",
                    "h-10 w-10 grid place-content-center rounded-full hover:bg-indigo-700 hover:text-white transition-all cursor-pointer"
                )}
                onClick={() => {
                    setSelectDate(date);
                }}
                >{date.date()}</h1>
                </div>
            );
            })}
        </div>
    </div>
  );
}