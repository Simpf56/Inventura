import NarudzbaService from "../../services/NarudzbaService";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { RouteNames } from "../../constants";

export default function NarudzbeDodaj(){

    const navigate = useNavigate()

    async function dodaj(narudzba) {
        const odgovor = await NarudzbaService.dodaj(narudzba)
        console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.NARUDZBE_PREGLED)
    }

    function obradiSubmit(e){ 
        e.preventDefault();
        let podaci = new FormData(e.target)
        dodaj({
            ukupan_iznos: podaci.get('ukupan_iznos'),
            datum: podaci.get('datum'),
            status: podaci.get('status'),
            kupacSifra: podaci.get('kupacSifra')
        })        
    }

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano'
        }
        return moment.utc(datum).format('DD.MM.YYYY')
    }

    return(
        <>
        Dodavanje narudžbe
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="ukupan_iznos">
                <Form.Label>Ukupan iznos</Form.Label>
                <Form.Control type="number" name="ukupan_iznos" required />
            </Form.Group>

            <Form.Group controlId="datum">
                <Form.Label>Datum</Form.Label>
                <Form.Control type="date" name="datum"  />
            </Form.Group >
            <FormGroup controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name="status" />
            </FormGroup>
            <Form.Group controlId="kupacSifra">
                <Form.Label>Kupac Šifra</Form.Label>
                <Form.Control type="number" name="kupacSifra" required />
            </Form.Group>           

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.NARUDZBE_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj narudžbu</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}