import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KupciDodaj(){

    return(
        <>
        Dodavanje kupaca
        <Row>
            <Col>
                <Link
                to={RouteNames.KUPCI_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
        </Row>
        </>
    )

}