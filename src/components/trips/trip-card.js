import Card from "antd/es/card/Card";

const TripCard = (props) => {

  return(
      <Card title={props.trip.trip_name } extra={<a href={`/trips/${props.trip.trip_id}`}>Edit</a>}>
        <p>{props.trip.description}</p>
        <p>Location: {props.trip.city}, {props.trip.country}</p>
        <p>{props.trip.start_date} to {props.trip.end_date}</p>
      </Card>
  )
}

export default TripCard
