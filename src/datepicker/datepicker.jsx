import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import './datepicker.css'
import MonthOptions from "./components/monthOptions";
import MonthContent from "./components/monthContent";
import Remarks from "./components/remarks";

@inject('CalendarData')
@observer
class Datepicker extends Component {
    state = {
        showOptions: false,
        arrowUp: false
    };

    onDropDown = () => {
        this.setState({showOptions: !this.state.showOptions});
        this.setState({arrowUp: !this.state.arrowUp});
    };

    onMonthPicker = month => {
        this.props.CalendarData.changeMonth(month);
    };

    onNextMonth = month => {
        this.props.CalendarData.nextMonth(month);
    };

    onPrevMonth = month => {
        this.props.CalendarData.prevMonth(month);
    };

    handleDaySelect = (day, week) => {
        if(day.dayNumber >= week.today)
            console.log(new Date(day.year, day.month, day.dayNumber));
    };

    render() {
        const {months, weeks, days, SelectedMonth} = this.props.CalendarData;

        return (
            <div className="date-picker-container">
                <div className="wrap">
                    <div className="btn-close"> </div>
                    <div className="calender-wrapper">
                        <div className="cal-title">תאריך יציאה</div>
                        <div className="cal-body">
                            <MonthOptions
                                months={months}
                                SelectedMonth={SelectedMonth}
                                arrowUp={this.state.arrowUp}
                                onPrevMonth={this.onPrevMonth}
                                onNextMonth={this.onNextMonth}
                                onDropDown={this.onDropDown}
                                onMonthPicker={this.onMonthPicker}
                                showOptions={this.state.showOptions}
                            />

                            <MonthContent
                                weeks={weeks}
                                days={days}
                                handleDaySelect={this.handleDaySelect}
                            />

                        </div>
                    </div>
                    <Remarks />
                </div>
            </div>
        )
    }
}


export default Datepicker;