import "./DayPreview.css";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const formatYYYMMDD = "yyyy-MM-dd";

type OneEvent = {
  date: string;
  description: string;
  id: string;
  image: string;
  title: string;
  url: string;
};

interface PropsInterface {
  databaseData: OneEvent[];
  dayPreviewDate: string;
  handleCloseDayPreview: () => void;
}

const DayPreview: React.FC<PropsInterface> = (props) => {
  const filteredData = props.databaseData.filter(
    (item) =>
      format(new Date(item.date), formatYYYMMDD) ===
      format(new Date(props.dayPreviewDate), formatYYYMMDD)
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
};

export default DayPreview;
