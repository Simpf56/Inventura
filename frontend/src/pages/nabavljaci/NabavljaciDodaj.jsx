import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import NabavljaciService from "../../services/NabavljaciService";


export default function NabavljaciDodaj(){

    const navigate = useNavigate();

    async function dodaj(nabavljac) {
        const odgovor = await NabavljaciService.dodaj(nabavljac)
        if(odgovor.greska){
            alert(odgovor.greska)
            return
        }

        navigate(RouteNames.NABAVLJACI_PREGLED)
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server po standardnom načinu

        let podaci = new FormData(e.target);

        dodaj(
            {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            naziv: podaci.get('naziv'),
            kontakt: podaci.get('kontakt'),
            br_tel: podaci.get('br_tel')
            }
        );
    }

    return(
        <>
        Dodavanje nabavljača
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required/>
            </Form.Group>
            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required/>
            </Form.Group>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required/>
            </Form.Group>
            <Form.Group controlId="kontakt">
                <Form.Label>Kontakt</Form.Label>
                <Form.Control type="text" name="kontakt" required/>
            </Form.Group>
            <Form.Group controlId="br_tel">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control type="text" name="br_tel" required/>
            </Form.Group>
            <hr/>    
            <Row>
                <Col xs={6} sm={12} med={3} lg={6} xl={6} xxl={6}>
                    <Link
                    to={RouteNames.NABAVLJACI_PREGLED}
                    className="btn btn-danger siroko"
                    >Odustani</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Dodaj nabavljača</Button>
                </Col>
            </Row>
        </Form>

        </>
    )

}