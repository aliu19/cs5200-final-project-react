import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <div id="error-page" className="position-absolute top-50 start-50 translate-middle">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.status}: {error.statusText || error.message}</i>
        </p>
      </div>
  );
}
