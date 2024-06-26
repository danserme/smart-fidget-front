import dayjs from "dayjs";
import readData from "./readData";

const data = await readData();
const recordDates = [];
data.forEach(el => {
    console.log(el)
    const d = el.date.split('.')[0];
    const m = el.date.split('.')[1];
    const y = el.date.split('.')[2];
    const date = new Date(parseInt("20"+y), m, d);
    recordDates.push(dayjs(date).toDate().toDateString());
});


export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year()
) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    //generate prefix dates
    for (let i = 0; i < firstDateOfMonth.day()-1; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: firstDateOfMonth.day(i)
        });
    }

    //generate current month
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
            hasData: recordDates.includes(firstDateOfMonth.date(i).toDate().toDateString())
        });
    }


    //generate suffix dates
    const remaining = 7 * 5 - arrayOfDate.length;

    for (let i = lastDateOfMonth.date()+1; i <= lastDateOfMonth.date()+remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i)
        });
    }


    return arrayOfDate;
};

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]