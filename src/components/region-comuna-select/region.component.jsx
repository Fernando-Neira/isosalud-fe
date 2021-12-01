import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import React, { useEffect, useState } from 'react'
import { locationService } from 'services/locations/LocationService'

const RegionSelect = ({ regionSelected, setRegionSelected, ...rest }) => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    locationService.getAll()
      .then(response => setLocations(response.data.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <Autocomplete
      key={regionSelected}
      id='regionSelect'
      options={locations}
      value={regionSelected}
      size='small'
      fullWidth
      onChange={(event, newValue) => setRegionSelected(newValue)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label='Región' variant='outlined' margin='normal' style={{ backgroundColor: 'white' }} />
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue)
        const parts = parse(option.name, matches)

        return (
          <>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </>
        )
      }}
      {...rest}
    />
  )
}

export default RegionSelect
