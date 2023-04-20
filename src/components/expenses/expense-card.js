import Card from "antd/es/card/Card";
import {message} from "antd";
import {delete_expense, get_expenses, updateExpense} from "../../services/services";

const ExpenseCard = (props) => {
  const deleteExpense = () =>
      delete_expense(props.token, props.expense.expense_id).then((msg) => {
        message.info(msg.message)
      })

  const payExpense = () => {
    updateExpense(props.token, props.expense.expense_id, props.username).then(() => {
      get_expenses(props.token, props.tripId).then((expenses) => {
        props.setExpenses(expenses)
      })
    })
  }

  return(
      <Card title={
        <>{props.expense.expense_name} &nbsp;
          {
            props.expense.transaction_completed === 1 ?
                <span style={{color: "green"}}>Paid</span> :
                <span style={{color: "red"}}>Unpaid</span>
          }
          </>}
            extra={
              <>
                {props.expense.transaction_completed === 0 ?
                    <><span onClick={payExpense} style={{color: "var(--bs-link-color)", "text-decoration": "underline"}}>Pay</span> &nbsp;</> :
                    <></>
                }
                {
                  props.expense.expense_owner === props.username ?
                      <span onClick={deleteExpense} style={{color: "var(--bs-link-color)", "text-decoration": "underline"}}>Delete</span> :
                      <></>
                }
              </>
            }>
        <p>Total Cost: ${props.expense.total_cost}</p>
        <p>Amount Owed: ${props.expense.amount_owed}</p>
        <p>Pay to: {props.expense.expense_owner}</p>
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
