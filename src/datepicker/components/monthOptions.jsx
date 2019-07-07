import React from 'react';

const MonthOptions = (props) => {
    const { months, SelectedMonth, arrowUp, onPrevMonth, onNextMonth, onDropDown, onMonthPicker, showOptions } = props;

    return (
        <div className="month-picker">
            <div className={`btn-month-change prev ${months.indexOf(SelectedMonth) === 0 ? "disabled" : ""}`}
                 onClick={() => onPrevMonth(SelectedMonth)}
            > </div>
            <div className="dropdown"
                 onClick={() => onDropDown()}
            >
                <div className="selected">{SelectedMonth.month + " " + SelectedMonth.year}</div>
                <div className={`arrow ${arrowUp ? "arrow-up" : ""}`}> </div>
                { showOptions ?
                    <div className="options">
                        <div className="opt-wrap">
                            <ul>
                                {months.map(item => (<li
                                        onClick={() => onMonthPicker(item)}
                                        key={item.month+item.year}
                                        className={""}
                                    >
                                        {item.month + " " + item.year}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> : ""
                }
            </div>
            <div className={`btn-month-change next ${months.indexOf(SelectedMonth) === months.length-1 ? "disabled" : ""}`}
                 onClick={() => onNextMonth(SelectedMonth)}
            > </div>
        </div>
    );
};

export default MonthOptions;
