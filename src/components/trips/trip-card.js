import Card from "antd/es/card/Card";

const TripCard = (props) => {

  return(
      <Card title={props.trip.trip_name } extra={<div><a href={`/trip/${props.trip.trip_id}/expenses`}>Expenses</a> &nbsp; <a href={`/trip/${props.trip.trip_id}`}>Trip Info</a></div>}>
        <p>{props.trip.description}</p>
        <p>Location: {props.trip.city}, {props.trip.country}</p>
        <p>{props.trip.start_date} to {props.trip.end_date}</p>
      </Card>
  )
}

export default TripCard
