  import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useEffect, useState } from 'react'
  import './TestMap.css'  





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

    useEffect(() => {
      calculateRoute()
      return clearRoute()
    },[])
  
  
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
      <div className='h-full'>
        <div className='h-full'>
          {/* Google Map div */}
          <GoogleMap
            center={center}
            zoom={17}
            mapContainerStyle={{  height: '100%' }}
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
        <div className='details-delivery-map'
        >
            <div className='flex flex-col items-center text-xl font-bold w-full'>
            <label for={distance} class="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Su pedido se encuentra a:</label>
              <span name={distance}  id={distance}>{distance}</span>
            </div>
            <br></br>
            <div className='flex flex-col items-center text-xl font-bold w-full'>
            <label for={duration} class="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Su pedido llegara en:</label>
              <span name={duration} id={duration}>{duration}</span>
            </div>
            <div className='flex justify-evenly bg-slate-200/[.06] text-xl font-bold w-3/4'>
            <img width={100} className='rounded-full' src={delivery[0].Delivery__[0].img} alt='alt '></img>
              <div className='flex flex-col items-center text-xl font-bold'>
              <label for={delivery[0].Delivery__[0].name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delivery Man</label>
              <span name={delivery[0].Delivery__[0].name} id={delivery[0].Delivery__[0].name}> {delivery[0].Delivery__[0].name} {delivery[0].Delivery__[0].lastName} </span>
              </div>
            </div>
            {/* <button className={buttonclass}
              onClick={() => {
                map.panTo(center)
                map.setZoom(17)
              }}
            >CENTRAR</button> */}
        </div>
      </div>
    )
  }
  
  export default Testmap