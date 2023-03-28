import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import "./login.css"

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

function Login() {
  return (
      <Form name="normal_login"
            className="login-form container-fluid position-absolute top-50 start-50 translate-middle"
            onFinish={onFinish}
      >
        <h1>Log in</h1> <br/>

        <Form.Item  name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Username!',
                      },
                    ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
        </Form.Item>

        <Form.Item name="password"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your Password!',
                     },
                   ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                 type="password"
                 placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

          <a className="login-form-register" href="">Sign up</a>
        </Form.Item>
      </Form>
  );
}

export default Login
