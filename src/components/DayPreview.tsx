import "./DayPreview.css";
import { v4 as uuidv4 } from "uuid";
import * as dateFns from "date-fns";
import React from "react";

const formatYYYMMDD = "yyyy-MM-dd";

export default function DayPreview(props) {
  const filteredData = props.databaseData.filter(
    (item) =>
      dateFns.format(new Date(item.date), formatYYYMMDD) ===
      dateFns.format(new Date(props.dayPreviewDate), formatYYYMMDD)
  );

  return (
    <div
      className="main-container"
      onClick={() => props.handleCloseDayPreview()}
    >
      <div className="day-preview-container">
        <div className="date" onClick={() => props.handleCloseDayPreview()}>
          {props.dayPreviewDate}
        </div>

        <div className="content-container">
          {filteredData.length > 0 &&
            filteredData.map((event) => {
              return (
                <div className="single-event" key={uuidv4()}>
                  <div className="event-info">
                    <div className="event-title">{event.title}</div>
                    <div className="event-description">{event.description}</div>
                  </div>

                  <img
                    className="event-img"
                    src={event.image}
                    alt="event-website"
                  />

                  <a className="event-page-btn" href={event.url}>
                    <p>VISIT EVENT PAGE</p>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
