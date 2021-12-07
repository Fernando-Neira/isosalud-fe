import { withStyles } from '@material-ui/core'
import styles from 'pages/my-dates/styles'
import { Appointments as DXAppointment } from '@devexpress/dx-react-scheduler-material-ui'
import DateFnsAdapter from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es/'

const dateFnsInstance = new DateFnsAdapter({ locale: esLocale })

const Appointment = ({ classes, ...restProps }) => {
  const { data } = restProps
  // eslint-disable-next-line no-unused-vars
  const { id, title, status, startDate } = data
  // eslint-disable-next-line no-unused-vars
  const isBefore = dateFnsInstance.isAfter(new Date(), dateFnsInstance.parse(startDate, 'yyyy-MM-dd HH:mm:ss'))

  const defaultColor = '#64B5F6'
  const redColor = '#ef5350'
  const greenColor = '#66bb6a'
  const yellowColor = '#ffa726'

  const getBackgroundColor = () => {
    if (status.name === 'Realizada') return greenColor
    if (status.name === 'Cancelada') return redColor
    if (status.name === 'Reagendada') return yellowColor

    return defaultColor
  }

  return (
    <DXAppointment.Appointment {...restProps} style={{ backgroundColor: getBackgroundColor() }} />
  )
}

export default withStyles(styles, { name: 'Appointment' })(Appointment)