/* eslint-disable */
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import styles from '../styles'
import { makeStyles } from '@material-ui/core/styles'
import dateUtils from 'utils/date-fns-utils'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.spacing(10)
  },
  bold: {
    fontWeight: 500
  }
}))

const PatientInfo = ({ isEditing, onContactClick, userData }) => {
  const classes = useStyles()

  const { personInfo: info = {} } = userData
  const { addressInfo: address = {} } = info

  const appointmentInfo = {
    past: 5,
    upcoming: 4
  }

  const BasicInfo = () => (
    <Grid container alignItems='center' justify='center' direction='column'>
      <Grid item xs={12}>
        <Avatar
          className={classes.avatar}
          alt={`${info?.firstName} ${info?.lastName}`}
          src={userData?.profileImageUri}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 5 }}>
        <Typography className={classes.bold}>
          {`${info?.firstName} ${info?.lastName}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {info?.rut}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {info?.email}
        </Typography>
      </Grid>
    </Grid>
  )

  const AppointmentsInfo = () => (
    <Grid container alignItems='center' justify='center' direction='column'>
      <Grid item xs={12} style={{ marginTop: 15 }}>
        <Typography className={classes.bold}>
          Citas
        </Typography>
      </Grid>
    </Grid>
  )

  const ContactPatient = () => (
    <Grid container>
      <Grid item style={{ marginTop: 15 }}>
        <Button
          variant='contained'
          color='primary'
          to={'/pacientes/'+userData?.id}
          component={Link}
        >
          Ir a perfil paciente
        </Button>
      </Grid>
    </Grid>
  )

  const textFieldProps = {
    disabled: !isEditing,
    fullWidth: true,
    margin: 'normal',
    inputProps: { style: styles.labelEditText }
  }

  const dateRegisterFormatted = () => {
    if (!info?.dateCreated) return null

    const dateParsed = dateUtils.parse(info?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
    return dateUtils.format(dateParsed, 'dd-MM-yyyy')
  }

  const dateBirthdayFormatted = () => {
    if (!info?.dateOfBirth) return null

    const dateParsed = dateUtils.parse(info?.dateOfBirth, 'yyyy-MM-dd')
    return dateUtils.format(dateParsed, 'dd-MM-yyyy')
  }

  const PersonalInfo = () => (
    <Grid container>
      <Grid item xs={5}>
        <TextField label='Telefono' value={info?.phone} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Direccion' value={address?.street} {...textFieldProps} />
      </Grid>

      <Grid item xs={5}>
        <TextField label='Region' value={address?.region?.name} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Comuna' value={address?.commune} {...textFieldProps} />
      </Grid>

      <Grid item xs={5}>
        <TextField label='Nacimiento' value={dateBirthdayFormatted()} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Sexo' value={info?.gender} {...textFieldProps} />
      </Grid>

      <Grid item xs={5}>
        <TextField label='Registro' value={dateRegisterFormatted()} {...textFieldProps} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={5}>
        <TextField label='Estado' value={userData?.status} {...textFieldProps} />
      </Grid>
    </Grid>
  )

  return (
    <Card variant='outlined'>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item md={5} xs={12}>
            <Grid container alignItems='center' justify='center' direction='column'>
              <Grid item>
                <BasicInfo />
              </Grid>
              <Grid item>
                <ContactPatient />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Grid container alignItems='center' justify='center' direction='column'>
              <Grid item>
                <PersonalInfo />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PatientInfo
