import { useNavigate, useParams } from "react-router-dom";
import Stavka_NarudzbeService from "../../services/Stavka_NarudzbeService";
import { useState, useEffect } from "react";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Dodan Link

export default function Stavke_NarudzbePromjena() {
    const navigate = useNavigate();
    const [stavka_narudzbe, setStavka_Narudzbe] = useState({});
    const routeParams = useParams();

    async function dohvatiStavku() {
        const odgovor = await Stavka_NarudzbeService.getBySifra(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStavka_Narudzbe(odgovor.poruka);
    }

    useEffect(() => {
        dohvatiStavku();
    }, []);

    async function promjena(podaci) {
        const odgovor = await Stavka_NarudzbeService.promjena(routeParams.sifra, podaci);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.NARUDZBE_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        promjena({
            kolicina: podaci.get('kolicina'),
            cijena: podaci.get('cijena'),
            proizvodNaziv: podaci.get('proizvodNaziv'),
            narudzbaNaziv: podaci.get('narudzbaNaziv'),
        });
    }

    return (
        <>
            <h3>Promjena stavke narudžbe</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="kolicina">
                    <Form.Label>Količina</Form.Label>
                    <Form.Control type="number" name="kolicina" required 
                        defaultValue={stavka_narudzbe?.kolicina || ''} />
                </Form.Group>
                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" required
                        defaultValue={stavka_narudzbe?.cijena || ''} />
                </Form.Group>
                <Form.Group controlId="proizvodNaziv">
                    <Form.Label>Naziv proizvoda</Form.Label>
                    <Form.Control type="text" name="proizvodNaziv" required
                        defaultValue={stavka_narudzbe?.proizvodNaziv || ''} />
                </Form.Group>
                <Form.Group controlId="narudzbaNaziv">
                    <Form.Label>Narudžba</Form.Label>
                    <Form.Control type="text" name="narudzbaNaziv" required
                        defaultValue={stavka_narudzbe?.narudzbaNaziv || ''} />
                </Form.Group>
                <hr />
                <Row>
                    <Col md={6}>
                        <Link to={RouteNames.NARUDZBE_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col md={6}>
                        <Button variant="success" type="submit" className="w-100">
                            Promjeni stavku
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
