import { useRouteError } from "react-router-dom";
import {Button, Result} from 'antd';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <div className="container-fluid position-absolute top-50 start-50 translate-middle">
        <Result status={error.status}
                title={error.status + ": " + (error.statusText || error.message)}
                subTitle="Sorry, an unexpected error has occurred."
                extra={<Button type="primary" href={"/"}>Back Home</Button>}
        />
      </div>
  );
}
