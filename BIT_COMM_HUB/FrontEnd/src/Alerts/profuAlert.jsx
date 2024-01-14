import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible() {
	const [show, setShow] = useState(true);

	return (
		<>
			<Alert show={show} variant="success">
				<Alert.Heading>Only CS Databse is active </Alert.Heading>

				<hr className="mb-2" />
				<div className="d-flex justify-content-end">
					<Button onClick={() => setShow(false)} variant="outline-success">
						Close me
					</Button>
				</div>
			</Alert>
		</>
	);
}

export default AlertDismissible;
