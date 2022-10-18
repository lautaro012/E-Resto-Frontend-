  import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
import { buttonclass } from '../../Style/Clases/Clases'
  





  let currentLocation = { lat: -34.610291 , lng: -58.391988 }
  const center = { lat: -34.610291 , lng: -58.391988 }

  navigator.geolocation.getCurrentPosition((suc) =>  {
    currentLocation = {
      lat: suc.coords.latitude, 
      lng: suc.coords.longitude
    }
    console.log(currentLocation)
  }, err => console.log(err))
  






  function Testmap({ delivery} ) {


    console.log('asdfasdgsdagasdg', delivery)


    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBcEkktrtcI1S6HvtWDNe83I75TECaSBgU",
      libraries: ['places']
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

  
    if (!isLoaded) {
      return <h1>HOLA</h1>
    }
  
    async function calculateRoute() {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: center,
        destination: currentLocation,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }
  
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
    }
  
    return (
      <div>
        <div>
          {/* Google Map div */}
          <GoogleMap
            center={center}
            zoom={17}
            mapContainerStyle={{ width: '50vh', height: '50vh' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <MarkerF position={center}/>

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        <div
        >
          <div>
            <div>
              <button className={buttonclass} type='submit' onClick={calculateRoute}>
                Calculate Route
              </button>
              <button className={buttonclass} 
                onClick={clearRoute}
              > LIMPIAR RUTA </button>
            </div>
          </div>
          <div>

            <span>Distance: {distance} </span>
            <span>Duration: {duration} </span>

            <button className={buttonclass}
              onClick={() => {
                map.panTo(center)
                map.setZoom(17)
              }}
            >CENTRAR</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Testmap