import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import FilterListIcon from '@material-ui/icons/FilterList'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing()
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

let EnhancedTableToolbar = (props) => {
  const { tableTitle, numSelected, classes } = props

  const TolltipDelete = () => (
    <Tooltip title='Delete'>
      <IconButton aria-label='Delete'>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {/* TODO: Refactorizar esto */}
        {/* eslint-disable-next-line multiline-ternary */}
        {numSelected > 0 ? (<Typography color='inherit' variant='subtitle1'>{numSelected} seleccionados</Typography>) : (<Typography variant='h6' id='tableTitle'>{tableTitle}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? <TolltipDelete /> : null}

        <Tooltip title='Filter list'>
          <IconButton aria-label='Filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

export default EnhancedTableToolbar
