import {Button, DatePicker, Form, Input, message} from "antd";
import {useEffect, useState} from "react";
import {delete_trip, get_trip, update_trip} from "../../services/services";
import {useParams} from "react-router-dom";
import moment from "moment";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Trip = (props) => {
  const [form] = Form.useForm()
  const [currentTrip, setCurrentTrip] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const {tripId} = useParams()

  useEffect(() => {
    get_trip(props.token, tripId).then((tripInfo) => {
      setCurrentTrip({
        trip_name: tripInfo.trip_name,
        description: tripInfo.description,
        city: tripInfo.city,
        country: tripInfo.country,
        start_date: moment(tripInfo.start_date),
        end_date: moment(tripInfo.end_date),
        trip_owner: tripInfo.trip_owner,
        attendees: tripInfo.attendees
      })
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue(currentTrip)

    if (props.currentUser.username === currentTrip.trip_owner) {
      setIsOwner(true)
    }
  }, [currentTrip])

  const onFinish = (trip_info) =>
      update_trip(props.token, tripId, {
        "trip_name": trip_info.trip_name,
        "description": trip_info.description,
        "city": trip_info.city,
        "country": trip_info.country,
        "start_date": trip_info.start_date.format("YYYY-MM-DD"),
        "end_date": trip_info.end_date.format("YYYY-MM-DD"),
        "attendees": trip_info.attendees.map(a => a.attendee)
      }).then((msg) => {
        message.info(msg.message)
      })

  const deleteTrip = () =>
      delete_trip(props.token, tripId).then((msg) => {
        message.info(msg.message)
        window.location = "/"
      })

  return(
      <Form
          form={form}
          name="existing-trip"
          className="container-fluid"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            "align-items": "center",
            "justify-content": "center"
          }}
          scrollToFirstError
          disabled={!isOwner}
      >
        <h1>{currentTrip.trip_name}</h1>
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
            ]}
        >
          <DatePicker format="YYYY-MM-DD"/>
        </Form.Item>

        <Form.Item
            name="trip_owner"
            label="Trip Owner"
        >
          <Input disabled={true}
                 style={{
                   width: '60%',
                 }}
          />
        </Form.Item>

        <Form.List
            name="attendees"
        >
          {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                    <Form.Item
                        label={'Attendee ' + index}
                        required={false}
                        key={field.key}
                    >
                      <Form.Item
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input attendee's name or delete this field.",
                            },
                          ]}
                          noStyle
                          name={[field.name, "attendee"]}
                          fieldKey={[field.fieldKey, "attendee"]}
                      >
                        <Input
                            placeholder="attendee username"
                            style={{
                              width: '60%',
                            }}
                            name={[field.name, 'id']}
                        />
                      </Form.Item>
                      {fields.length > 0 && isOwner ? (
                          <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                          />
                      ) : null}
                    </Form.Item>
                ))}
                <Form.Item>
                  <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{
                        width: '60%',
                      }}
                      icon={<PlusOutlined />}
                  >
                    Add Attendee
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
          )}
        </Form.List>

        {
          isOwner ?
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Trip
                </Button>

                <Button onClick={deleteTrip} style={{float: "right", "text-decoration": "none"}}>Delete Trip</Button>
              </Form.Item>
              :
              <></>
        }
      </Form>
  )
}

export default Trip
