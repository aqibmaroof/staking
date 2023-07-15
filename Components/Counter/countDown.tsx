import { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface IProps {
  expiryTime: number;
}

interface IObj {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
let dayLeft: any;

function setDate(endTime: number) {
  var launchDate: string = new Date(endTime).toUTCString();
  var currDate: Date = new Date();
  let daysDiff: number =
    (new Date(launchDate).getTime() - currDate.getTime()) /
    (1000 * 60 * 60 * 24);
  let hoursDiff: number = (daysDiff - parseInt(daysDiff.toString())) * 24;
  let minDiff: number = (hoursDiff - parseInt(hoursDiff.toString())) * 60;
  let secDiff: number = (minDiff - parseInt(minDiff.toString())) * 60;
  let milisec: number = (secDiff - parseInt(secDiff.toString())) * 1000;
  const daysLeft = parseInt(daysDiff.toString()) * 24 * 60 * 60 * 1000;
  const hourLeft = parseInt(hoursDiff.toString()) * 60 * 60 * 1000;
  const minLeft = parseInt(minDiff.toString()) * 60 * 1000;
  const secLeft = parseInt(secDiff.toString()) * 1000;
  dayLeft = daysLeft + hourLeft + minLeft + secLeft + milisec;
}

function CountDown(props: IProps) {
  let intervalCounter: any;

  const [counter, setCounter] = useState(0);
  if (counter === 0) setDate(new Date(props.expiryTime).getTime());

  const renderer = (obj: IObj) => {
    const { days, hours, minutes, seconds, completed } = obj;
    if (completed) {
      location.reload();
      // Render a completed state
      return <>00:00:00:00</>;
    } else {
      // Render a countdown
      return (
        <>
          {days >= 10 ? days : "0" + days}:
          {hours >= 10 ? "" + hours : "0" + hours}:
          {minutes >= 10 ? "" + minutes : "0" + minutes}:
          {seconds >= 10 ? "" + seconds : "0" + seconds}{" "}
        </>
      );
    }
  };

  useEffect(() => {
    intervalCounter = setInterval(() => {
      setDate(new Date(props.expiryTime).getTime());
      setCounter((prevState) => prevState + 1);
    }, 1000);
    () => {
      clearInterval(intervalCounter);
    };
  }, []);

  return (
    <Countdown date={new Date().getTime() + dayLeft} renderer={renderer} />
  );
}

export default CountDown;
