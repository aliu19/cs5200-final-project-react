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
  }, [props])

  return(
      <div>
        <h1>{props.currentUser.username}'s Trips:</h1>
        <Button href="/new-trip" shape="round" type="primary" size="large" style={{position: "absolute", right: 15, bottom: 15}}>Create Trip</Button>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {
            trips.length ? trips.map(trip => <TripCard trip={trip}></TripCard>) : <>Error</>
          }
        </Space>

      </div>
  )
}

export default Trips
