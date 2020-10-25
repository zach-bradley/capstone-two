import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, ComboboxList} from '@reach/combobox';
import "./Search.css";
import '@reach/combobox/styles.css';



function Search({center, panTo}) {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => center.lat,
        lng: () => center.lng
      },
      //200km converted to meters
      radius: 200*1000,
    }
  })
  return (
    <div className="Search">
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({address})
          const {lat, lng} = await getLatLng(results[0])
          panTo({lat, lng});
         } catch(error) {
          console.log("Error!")
        }
      }}>
        <ComboboxInput className="Search__Input" value={value} onChange={(e) => {
          setValue(e.target.value)
        }}
        disabled={!ready}
        placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === 'OK' && data.map(({id, description}) => (
            <ComboboxOption key={id} value={description} />
          ))}          
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>    
    </div>

  )
}

export default Search
