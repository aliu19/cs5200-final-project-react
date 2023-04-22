import {useEffect} from 'react';
import {update_profile} from "../../services/services";
import {Button, Form, Input, message} from "antd";

const Profile = (props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      username: props.currentUser.username,
      password :props.currentUser.password,
      first_name: props.currentUser.first_name,
      last_name: props.currentUser.last_name,
      email: props.currentUser.email
    })
  }, [props.currentUser])

  const onFinish = (user) =>
      update_profile(props.token, user, props.setCurrentUser).then((msg) => {
        message.info(msg.message)
      })

  return(
      <Form
          form={form}
          name="profile"
          className="container-fluid position-absolute top-50 start-50 translate-middle"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
      >
        <h1>Profile</h1>
        <br/>

        <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
                whitespace: true,
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
                whitespace: true,
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
        >
          <Input disabled={true}/>
        </Form.Item>

        <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
        >
          <Input disabled={true}/>
        </Form.Item>


        <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
  )
}

export default Profile
