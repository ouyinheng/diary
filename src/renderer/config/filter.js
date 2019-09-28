import moment from 'moment'

export default {
    format(value, format='YYYY-MM-DD') {
        return moment(value, format);
    }
}