import React from 'react';

const MonthContent = (props) => {
    const { days, weeks, handleDaySelect } = props;
    let daysKey = 0;
    let weeksKey = 0;

    return (
        <div className="cal-month">
            <div className="month-header">
                {days.map(item => (<div
                        key={item}
                        className={"day"}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {weeks.map(week => (<div
                    key={weeksKey++}
                    className={"month-week"}
                >
                    {week.daysArr.map(day => (<div
                            key={daysKey++}
                            className={`day ${(day.dayNumber !== "" && day.dayNumber >= week.today) ? "available" : ""}`}
                            onClick={() => handleDaySelect(day, week)}
                        >
                            {day.dayNumber}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MonthContent;
