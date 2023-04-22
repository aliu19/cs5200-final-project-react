import Card from "antd/es/card/Card";
import moment from "moment";

const TripCard = (props) => {

  return(
      <Card title={props.trip.tripName } extra={<div><a href={`/trip/${props.trip.tripID}/expenses`}>Expenses</a> &nbsp; <a href={`/trip/${props.trip.tripID}`}>Trip Info</a></div>}>
        <p>{props.trip.description}</p>
        <p>Location: {props.trip.city}, {props.trip.country}</p>
        <p>{moment.utc(props.trip.startDate).format("YYYY-MM-DD")} to {moment.utc(props.trip.endDate).format("YYYY-MM-DD")}</p>
      </Card>
  )
}

export default TripCard
