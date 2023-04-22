import {Button, Space} from "antd";
import TripCard from "./trip-card";
import {useEffect, useState} from "react";
import {get_trips} from "../../services/services";

const Trips = (props) => {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    get_trips(props.token, props.currentUser.username)
    .then((trips) => {
      setTrips(trips)
    })
  }, [props.currentUser.first_name])

  return(
      <div>
        <h1>{props.currentUser.first_name}'s Trips:</h1>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {
            trips.length ? trips.map(trip => <TripCard trip={trip} key={trip.tripID}></TripCard>) : <></>
          }
        </Space>
        <Button href="/new-trip" shape="round" type="primary" size="large" style={{position: "fixed", right: 15, bottom: 15}}>Create Trip</Button>
      </div>
  )
}

export default Trips
