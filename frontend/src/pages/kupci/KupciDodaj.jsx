import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import KupacService from "../../services/KupacService";


export default function KupciDodaj(){

    const navigate = useNavigate();

    async function dodaj(kupac) {
        const odgovor = await KupacService.dodaj(kupac)
        if(odgovor.greska){
            alert(odgovor.greska)
            return
        }

        navigate(RouteNames.KUPCI_PREGLED)
    }

    function odradiSubmit(e){ //e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server po standardnom načinu

        const podaci = new FormData(e.target);

        dodaj(
            {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            br_tel: podaci.get('br_tel'),
            adresa: podaci.get('adresa'),
            datum_rod: podaci.get('datum_rod')
            }
        );
    }

    return(
        <>
        Dodavanje kupaca
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required/>
            </Form.Group>
            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required/>
            </Form.Group>
            <Form.Group controlId="br_tel">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control type="text" name="br_tel" required/>
            </Form.Group>
            <Form.Group controlId="adresa">
                <Form.Label>Adresa</Form.Label>
                <Form.Control type="text" name="adresa" required/>
            </Form.Group>
            <Form.Group controlId="datum_rod">
                <Form.Label>Datum rođenja</Form.Label>
                <Form.Control type="date" name="datum_rod" required/>
            </Form.Group>




            
            <hr/>    
            <Row>
                <Col xs={6} sm={12} med={3} lg={6} xl={6} xxl={6}>
                    <Link
                    to={RouteNames.KUPCI_PREGLED}
                    className="btn btn-danger siroko"
                    >Odustani</Link>
                </Col>
                <Col xs={6} sm={12} med={9} lg={6} xl={6} xxl={6}>
                    <Button variant="success" type="submit" className="siroko">
                        Dodaj kupca</Button>
                </Col>
            </Row>
        </Form>

        </>
    )

}