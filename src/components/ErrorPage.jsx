import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()

    return (
        <div>
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to="/">Go Back to homepage.</Link>
        </div>
    );
};

export default ErrorPage;
