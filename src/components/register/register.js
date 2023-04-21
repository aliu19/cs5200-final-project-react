import { Button, Form, Input, message} from 'antd';
import {register} from "../../services/services";

const Register = () => {
  const onFinish = (user) => {
    register(user).then((r) => {
      message.info(r.msg)
    })
  }

  return(
      <Form
          name="register"
          className="container-fluid position-absolute top-50 start-50 translate-middle"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
      >
        <h1>Sign up</h1>
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
          <Input />
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
          <Input />
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
            hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>

          <a href="/" style={{float: "right", "text-decoration": "none"}}>Log In</a>
        </Form.Item>
      </Form>
  )
}

export default Register
