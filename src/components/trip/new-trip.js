import {Button, DatePicker, Form, Input} from "antd";
import {create_trip} from "../../services/services";

const NewTrip = (props) => {
  const onFinish = (trip_info) =>
      create_trip(props.token, {
        "trip_name": trip_info.trip_name,
        "description": trip_info.description,
        "city": trip_info.city,
        "country": trip_info.country,
        "start_date": trip_info.start_date.format("YYYY-MM-DD"),
        "end_date": trip_info.end_date.format("YYYY-MM-DD"),
        "trip_owner": props.currentUser.username,
      })

  return(
      <Form
          name="new-trip"
          className="container-fluid position-absolute top-50 start-50 translate-middle"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
      >
        <h1>New Trip</h1>
        <br/>

        <Form.Item
            name="trip_name"
            label="Trip Name"
            rules={[
              {
                required: true,
                message: 'Please input the trip name!',
                whitespace: true,
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name={"description"}
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input the trip description!',
                whitespace: true,
              },
            ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: 'Please input the trip city!',
                whitespace: true,
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: 'Please input the trip country!',
                whitespace: true,
              },
            ]}
        >
          <Input />
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

        <Form.Item>
          {/*TODO  href="/"*/}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  )
}

export default NewTrip
