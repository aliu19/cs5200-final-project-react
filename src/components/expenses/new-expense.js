import {Button, Checkbox, DatePicker, Form, Input, InputNumber, message} from "antd";
import {useState} from "react";
import {createExpense} from "../../services/services";
import {useParams} from "react-router-dom";

const NewExpense = (props) => {
  const [accommodationCheck, setAccommodationCheck] = useState(false)
  const {tripId} = useParams()

  const onCheckboxChange = (e) => {
    setAccommodationCheck(e.target.checked);
  };

  const onFinish = (expenseInfo) => {
    accommodationCheck ?
        createExpense(props.token, {
          "expense_name": expenseInfo.expense_name,
          "total_cost": expenseInfo.total_cost,
          "address": expenseInfo.address,
          "start_date": expenseInfo.start_date.format("YYYY-MM-DD"),
          "end_date": expenseInfo.end_date.format("YYYY-MM-DD")
        }).then((msg) => {
          message.info(msg.message)
          window.location = "/trip/" + tripId + "/expenses"
        }) :
        createExpense(props.token, {
          "expense_name": expenseInfo.expense_name,
          "total_cost": expenseInfo.total_cost
        }).then((msg) => {
          message.info(msg.message)
          window.location = "/trip/" + tripId + "/expenses"
        })
  }

  return (
      <Form
          name="existing-trip"
          className="container-fluid"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            "align-items": "center",
            "justify-content": "center"
          }}
          scrollToFirstError
      >
        <h1>New Expense</h1>
        <br/>

        <Form.Item
            name="expense_name"
            label="Expense Name"
            rules={[
              {
                required: true,
                message: 'Please input the expense name!',
                whitespace: true,
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="total_cost"
            label="Total Cost"
            rules={[
              {
                required: true,
                message: 'Please input the total expense cost!',
                type: 'number',
                min: 0,

              }
            ]}
        >
          <InputNumber style={{ width: '50%'}}/>
        </Form.Item>

        <Form.Item>
          <Checkbox checked={accommodationCheck} onChange={onCheckboxChange}>
            Expense is an accommodation
          </Checkbox>
        </Form.Item>

        {
          accommodationCheck ?
              <>
                <Form.Item
                    name={"address"}
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the trip description!',
                        whitespace: true,
                      },
                    ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[
                      {
                        required: true,
                        message: 'Please select the start date!',
                      },
                    ]}
                >
                  <DatePicker format="YYYY-MM-DD"/>
                </Form.Item>

                <Form.Item
                    name="end_date"
                    label="End Date"
                    rules={[
                      {
                        required: true,
                        message: 'Please select the end date!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('start_date') < value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('End date must be after start date!'));
                        },
                      }),
                    ]}
                >
                  <DatePicker format="YYYY-MM-DD"/>
                </Form.Item>
              </>
              : <></>
        }

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  )
}

export default NewExpense
