/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import useLocalStorage from 'hooks/useLocalStorage'
import dateFnsInstance from 'utils/date-fns-utils'

const Header = () => {
  const [currentUser] = useLocalStorage('current_user')
  const date = new Date()
  const time = date.getHours()

  const dateFormatted = dateFnsInstance.format(date, 'EEEE dd \'de\' MMMM \'del \'yyyy \'-\' HH:mm a')

  const greetings = time < 12 ? 'Buenos días' : 'Buenas tardes'
  
  const patientName = `${currentUser?.personInfo?.firstName} ${currentUser?.personInfo?.lastName}`
  

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {greetings}, {patientName}!
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Typography variant='subtitle2'>
          {dateFormatted}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
