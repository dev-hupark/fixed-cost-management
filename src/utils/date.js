import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ko from 'dayjs/locale/ko'

dayjs.locale(ko)
dayjs.extend(relativeTime)

export const format = (format, date) => dayjs(date).format(format)

export const fromNow = (date) => dayjs(date).fromNow()
