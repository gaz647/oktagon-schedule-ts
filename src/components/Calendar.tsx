import "./Calendar.css";
import { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { v4 as uuidv4 } from "uuid";
import oktagon_logo_mini from "../images/oktagon_logo_mini.png";
import DayPreview from "./DayPreview";
import clickSound from "../assets/btn_click.mp3";
const formatOfYear = "yyy";
const formatOfMonth = "MMMM";
const formatOfWeek = "eee";
const formatOfDay = "d";
const formatYYYMMDD = "yyyy/MM/dd";
import { db } from "../firebase/config";
import { collection, query, getDocs } from "firebase/firestore";

type Result = {
  id: 
}

const Calendar: React.FC = (props) => {
  const [databaseData, setDatabaseData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "events"));
        const querySnapshot = await getDocs(q);

        let result:  = [];
        querySnapshot.forEach((oneEvent) => {
          result.push({ id: oneEvent.id, ...oneEvent.data() });
        });
        setDatabaseData(result);
      } catch {
        console.log("No event available");
      }
    }

    fetchData();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  //  Today
  const today = new Date();

  // First day of currentDate
  const firstDay = dateFns.startOfMonth(currentDate);

  // Last day of currentDate
  const lastDay = dateFns.endOfMonth(currentDate);

  // First day of week of firstDay
  const startDate = dateFns.startOfWeek(firstDay, { weekStartsOn: 1 });

  // Last day of week of lastDay
  const endDate = dateFns.endOfWeek(lastDay, { weekStartsOn: 1 });

  // render all days
  const totalDate = dateFns.eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weeks = ((date) => {
    const weeks = [];
    for (let i = 0; i <= 6; i++) {
      weeks.push(date[i]);
    }
    return weeks;
  })(totalDate);

  const clickAudio = new Audio(clickSound);

  const [showDayPreview, setShowDayPreview] = useState(false);

  const handleCloseDayPreview = () => {
    clickAudio.play();
    setShowDayPreview(false);
  };

  const [dayPreviewDate, setDayPreviewDate] = useState(null);

  const handleClickMinus = () => {
    clickAudio.play();
    setCurrentDate(dateFns.subMonths(currentDate, 1));
  };

  const handleClickPlus = () => {
    clickAudio.play();
    setCurrentDate(dateFns.addMonths(currentDate, 1));
  };

  return (
    <div className="calendar-body">
      <div className="month-changer">
        <button onClick={handleClickMinus}>&lt;</button>
        <h1 onClick={() => setCurrentDate(new Date())}>
          {dateFns.format(currentDate, formatOfMonth)}{" "}
          {dateFns.format(currentDate, formatOfYear)}
        </h1>
        <button onClick={handleClickPlus}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {weeks.map((week) => (
          <div key={uuidv4()} className="days-of-week">
            {dateFns.format(week, formatOfWeek)}
          </div>
        ))}

        {totalDate.map((date) => {
          const content = databaseData.filter(
            (item) =>
              dateFns.format(new Date(item.date), "yyyy-MM-dd") ===
              dateFns.format(date, "yyyy-MM-dd")
          );

          return (
            <div
              key={uuidv4()}
              className={`dates ${
                dateFns.compareDesc(new Date(date), new Date(firstDay)) === 1 ||
                dateFns.compareDesc(new Date(date), new Date(lastDay)) === -1
                  ? "past-dates"
                  : ""
              } ${content.length > 0 ? "cursor-pointer" : ""}`}
              onClick={
                content.length > 0
                  ? () => {
                      clickAudio.play();
                      setShowDayPreview(true);
                      setDayPreviewDate(dateFns.format(date, formatYYYMMDD));
                    }
                  : null
              }
            >
              <div
                className={`day-date ${
                  content.length > 0 ? "dates-with-content" : ""
                } ${
                  dateFns.format(new Date(date), formatYYYMMDD) ===
                  dateFns.format(new Date(today), formatYYYMMDD)
                    ? "today"
                    : ""
                }`}
              >
                {dateFns.format(date, formatOfDay)}
              </div>
              <div className="date-content">
                {content.length > 0 && (
                  <img
                    className="day-with-event-logo"
                    src={oktagon_logo_mini}
                    alt=""
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showDayPreview && (
        <DayPreview
          handleCloseDayPreview={handleCloseDayPreview}
          dayPreviewDate={dayPreviewDate}
          databaseData={databaseData}
        />
      )}
    </div>
  );
};

export default Calendar;
