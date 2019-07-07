import { observable, action, computed } from "mobx"
import Moment from 'moment';
import "moment/min/locales.min";
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
moment.locale('he');

class Calendar {

    @observable Months = this.getMonthsList();
    @observable Weeks = this.setWeeks();
    @observable SelectedMonth = this.Months[0];

    getMonthsList(){
        const monthsArray =[];
        function getRangeOfDates(start, end, key, arr = [start.startOf(key)]) {
            if(start.isAfter(end)) throw new Error('start must precede end');
            const next = moment(start).add(1, key).startOf(key);
            if(next.isAfter(end, key)) return arr;
            return getRangeOfDates(next, end, key, arr.concat(next));
        }

        const begin = moment();
        const end = moment().add('1.3', 'year');
        let arr = getRangeOfDates(begin, end, 'month');
        arr.forEach(item => {
            monthsArray.push({year: item.format('YYYY'), month: item.format('MMMM'), numberOfMonth: item.format('M')})
        });
        monthsArray.pop();
        return monthsArray;
    }

    setWeeks(y, m){
        function getDayIndex(day) {
            let dayByNumber = 0;
            switch(day) {
                case "א":
                    dayByNumber = 0;
                    break;
                case "ב":
                    dayByNumber = 1;
                    break;
                case "ג":
                    dayByNumber = 2;
                    break;
                case "ד":
                    dayByNumber = 3;
                    break;
                case "ה":
                    dayByNumber = 4;
                    break;
                case "ו":
                    dayByNumber = 5;
                    break;
                case "ש":
                    dayByNumber = 6;
                    break;
                default:
                    dayByNumber = 0;
            }
            return dayByNumber;
        }

        let year = y ? y : moment().year();
        let month = m ? m-1 : moment().month();
        let startDate = moment.utc([year, month]);

        let firstDay = moment(startDate).startOf('month');
        let endDay = moment(startDate).endOf('month');

        let monthRange = moment.range(firstDay, endDay);

        let weeks = [];
        for (let mday of monthRange.by('days')) {
            if (weeks.indexOf(mday.week()) === -1) {
                weeks.push(mday.week());
            }
        }
        // lsat year of week exception**
        if(month === 11){
            weeks.pop();
            weeks.push(53);
        }

        let weeksArray = [];
        for (let index = 0; index < weeks.length; index++) {
            let weeknumber = weeks[index];
            let firstWeekDay = moment(firstDay).week(weeknumber).day(0);
            if (firstWeekDay.isBefore(firstDay)) {
                firstWeekDay = firstDay;
            }

            let lastWeekDay = moment(endDay).week(weeknumber).day(6);
            if (lastWeekDay.isAfter(endDay) && month !== 11) {
                lastWeekDay = endDay;
            }
            // last week of year exception**
            if(weeks[index] === 53)
                lastWeekDay = endDay;
            //
            let weekRange = moment.range(firstWeekDay, lastWeekDay);
            weeksArray.push(weekRange);

        }

        weeksArray.forEach(item => {
            item.daysArr = [];
            item.today = (parseInt(month) === moment().month() && parseInt(year) === moment().year()) ? moment().date() : 0;
            let start = parseInt(item.start.format('DD'), 10);
            let startWeekDay = getDayIndex(item.start.format('dd'));
            let endWeekDay = getDayIndex(item.end.format('dd'));
            for(let i = 0; i <= 6; i++){
                if(startWeekDay > i || endWeekDay < i){
                    item.daysArr.push({dayNumber:""});
                }
                else {
                    item.daysArr.push({
                        dayNumber:start,
                        month: month,
                        year: year
                    });
                    start++;
                }
            }
        });
        return weeksArray;
    }

    @computed get months(){
        return this.Months;
    }

    @computed get weeks(){
        return this.Weeks;
    }

    @computed get days(){
        return moment.weekdaysShort();
    }

    @action changeMonth = (month) => {
        this.SelectedMonth = month;
        this.Weeks = this.setWeeks(month.year, month.numberOfMonth);
    };

    @action nextMonth = (month) => {
        let next = this.Months.indexOf(month) + 1;
        if(next <= this.Months.length - 1){
            this.SelectedMonth = this.Months[next];
            this.Weeks = this.setWeeks(this.Months[next].year, this.Months[next].numberOfMonth);
        }
        return next;
    };

    @action prevMonth = (month) => {
        let prev = this.Months.indexOf(month) - 1;
        if(prev >= 0){
            this.SelectedMonth = this.Months[prev];
            this.Weeks = this.setWeeks(this.Months[prev].year, this.Months[prev].numberOfMonth);
        }
    }


}

const CalendarData = new Calendar();
export default CalendarData;