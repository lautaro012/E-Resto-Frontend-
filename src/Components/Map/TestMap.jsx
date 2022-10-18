  import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
import { buttonclass } from '../../Style/Clases/Clases'
  
  const center = { lat: -34.610291 , lng: -58.391988 }
  
  function Testmap() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBcEkktrtcI1S6HvtWDNe83I75TECaSBgU",
      libraries: ['places']
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
  
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
  
    if (!isLoaded) {
      return <h1>HOLA</h1>
    }
  
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return <>A</>
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      console.log(originRef.current.value)
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
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
      originRef.current.value = ''
      destiantionRef.current.value = ''
    }
  
    return (
      <div>
        <div>
          {/* Google Map div */}
          <GoogleMap
            center={center}
            zoom={18}
            mapContainerStyle={{ width: '100vh', height: '100vh' }}
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
              <Autocomplete>
                <input type='text' placeholder='Origin' ref={originRef} />
              </Autocomplete>
            </div>
            <div>
              <Autocomplete>
                <input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                />
              </Autocomplete>
            </div>
  
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
                map.setZoom(18)
              }}
            >CENTRAR</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Testmap