import { useState, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NarudzbaService from "../../services/NarudzbaService";

export default function NarudzbePromjena() {
    const [narudzba, setNarudzba] = useState({});
    const navigate = useNavigate();
    const routeParams = useParams();

    async function dohvatiNarudzbu() {
        const odgovor = await NarudzbaService.getBySifra(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }

        let n = odgovor.poruka;
        n.datum = moment.utc(n.datum).format('yyyy-MM-DD');
        setNarudzba(n);
    }

    useEffect(() => {
        dohvatiNarudzbu();
    }, []);

    async function promjena(narudzba) {
        const odgovor = await NarudzbaService.promjena(routeParams.sifra, narudzba);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.NARUDZBE_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);
        promjena({
            ukupan_iznos: parseInt(podaci.get('ukupan_iznos')),
            datum: moment(podaci.get('datum')).format('YYYY-MM-DD'),
            status: podaci.get('status'),
            kupacSifra: parseInt(podaci.get('kupacSifra'))
        });
    }

    return (
        <>
            <h3>Promjena narudžbe</h3>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="ukupan_iznos">
                    <Form.Label>Ukupan iznos</Form.Label>
                    <Form.Control type="number" step={0.01} name="ukupan_iznos" defaultValue={narudzba.ukupan_iznos} required />
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" name="datum" defaultValue={narudzba.datum ? moment.utc(narudzba.datum).format('YYYY-MM-DD') : ''} />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" name="status" defaultValue={narudzba.status} />
                </Form.Group>

                <Form.Group controlId="kupacSifra">
                    <Form.Label>Kupac Sifra</Form.Label>
                    <Form.Control type="number" name="kupacSifra" defaultValue={narudzba.kupacSifra} required />
                </Form.Group>

                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.NARUDZBE_PREGLED} className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">Promjeni narudžbu</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

