import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {get_expenses, get_trip} from "../../services/services";
import ExpenseCard from "./expense-card";
import {Button, Space} from "antd";

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([])
  const [tripName, setTripName] = useState("")
  const {tripId} = useParams()

  useEffect(() => {
    get_trip(props.token, tripId).then((tripInfo) => {
      setTripName(tripInfo.trip_name)
    })
    get_expenses(props.token, tripId).then((expenses) => {
      setExpenses(expenses)
    })
  }, [])

  return(
      <div>
        <h1>{tripName} Expenses:</h1>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {
            expenses.length ? expenses.map(expense => <ExpenseCard token={props.token} expense={expense} username={props.currentUser.username} tripId={tripId} setExpenses={setExpenses} key={expense.expense_id}></ExpenseCard>) : <></>
          }
        </Space>
        <Button href={"/trip/" + tripId + "/new-expense"} shape="round" type="primary" size="large" style={{position: "fixed", right: 15, bottom: 15}}>Create Expense</Button>
      </div>
  )
}

export default ExpenseList
