export default {
    data(){
        return {
            currentWeekday: '',
            firstMonthDays: '',
            lastMonthDays: '',
            currentMonthDays: ''
        }
    },
    methods: {
        // 当月第一天减去当前日的一周的前几天
        getFirstDay() {
            const date = new Date();
            date.setDate(1);
            var dateStart = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            console.log(new Date(dateStart).getDay())
            console.log(this.$moment(date-6).format('YYYY-MM-DD'))
        },
        getLastDay() {

        },
        getData() {
            this.getFirstDay();
            
        }
    }
}