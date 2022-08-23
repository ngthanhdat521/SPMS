import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from "./Calendar.module.scss";
import CouncilService from "../../../../services/Supporter/Council/Council";

function Calendar() {
    const [events, setEvents] = useState([]);

    const onLoad = async () => {
        let { data, isSucess } = await CouncilService.loadCouncilByRole();
        if(isSucess) setEvents(data);
    };

    useEffect(onLoad, []);
    return (
        <div className={styles["calendar"]}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                //weekends={false}
                //initialDate="2022-04-07"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
            />
        </div>
    );
}

export default Calendar;
