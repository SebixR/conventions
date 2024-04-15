import React from "react";
import TopNav from "../TopNav/TopNav";
import "./Schedule.css";
import {Link} from "react-router-dom";

const Schedule = () => {

    function Schedule({ days }) {
        return (
            <div className="days">
                {days.map((day, index) => (
                    <Day key={index} events={day.events} />
                ))}
            </div>
        )
    }

    function Day({ events }) {
        return (
            <div className="day-wrap">
                <div className="date-wrap">
                    <label className="day-label">Day 1</label>
                    <label className="date-label">12.05.2024</label>
                </div>

                <div className="day-content-wrap">
                    {events.map((event, index) => (
                        <Event key={index} duration={event.duration} title={event.title} />
                    ))}
                </div>
            </div>
        )
    }

    function Event({ duration, title }) {
        const hourWidth = 200
        const style = {
            width: `${duration * hourWidth}px`
        }

        return (
            <div className="event" style={style}>
                <label className="event-time-label">From 10:00 To 12:00</label>
                <label className="event-name-label">{title}</label>
            </div>
        )
    }

    const days = [
        { events: [{ title: "Event 1", duration: 1 },
                { title: "Event 2", duration: 1.5 },
                { title: "Event 3", duration: 3 },
                { title: "Event 4", duration: 2 }]},
        { events: [{ title: "Event 1", duration: 0.75 },
                { title: "Event 2", duration: 1 },
                { title: "Event 3", duration: 1.5 }]},
        { events: [{ title: "Event 1", duration: 1 },
                { title: "Event 2", duration: 1 },
                { title: "Event 3", duration: 1 },
                { title: "Event 4", duration: 1 },
                { title: "Event 5", duration: 1 },
                { title: "Event 6", duration: 1 },
                { title: "Event 2", duration: 1 },
                { title: "Event 3", duration: 1 },
                { title: "Event 4", duration: 1 },
                { title: "Event 5", duration: 1 },
                { title: "Event 6", duration: 1 },
                { title: "Event 7", duration: 1 }]},
    ]

    return (
        <div className="main-wrap">

            <TopNav/>

            <div className="schedule-content-wrap">
                <h2 className="con-name">San Diego Comic-Con</h2>

                <Schedule days={days}/>
            </div>
            <Link className="back-button" to="/ConventionPage/:0">Back</Link>

        </div>
    )
}

export default Schedule;