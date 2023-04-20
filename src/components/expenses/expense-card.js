import Card from "antd/es/card/Card";
import {message} from "antd";
import {delete_expense} from "../../services/services";

const ExpenseCard = (props) => {
  const deleteExpense = () =>
      delete_expense(props.token, props.expense.expense_id).then((msg) => {
        message.info(msg.message)
      })

  return(
      <Card title={props.expense.expense_name} extra={<div onClick={deleteExpense} style={{color: "var(--bs-link-color)", "text-decoration": "underline"}}>Delete</div>}>
        <p>Total Cost: ${props.expense.total_cost}</p>
        {
          props.expense.accomodation ?
              <>
                <p>Address: {props.expense.accomodation.address}</p>
                <p>{props.expense.accomodation.start_date} to {props.expense.accomodation.end_date}</p>
              </> :
              <></>
        }
      </Card>
  )
}

export default ExpenseCard
