import { useState, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { AsyncTypeahead} from "react-bootstrap-typeahead";
import { useRef } from "react";
import ProizvodService from "../../services/ProizvodService";
import NabavljaciService from "../../services/NabavljaciService";

export default function ProizvodiPromjena() {
    const [proizvod, setProizvod] = useState({});
    const navigate = useNavigate();
    const routeParams = useParams();
    const [nabavljaci, setNabavljaci] = useState([]);
    const [odabraniNabavljac, setOdabraniNabavljac] = useState(null);
    const typeaheadRef = useRef(null);

    async function dohvatiProizvode() {
        const odgovor = await ProizvodService.getBySifra(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }

        let n = odgovor.poruka;
        n.datum = moment.utc(n.datum).format('yyyy-MM-DD');
        setProizvod(n);
    }

    useEffect(() => {
        dohvatiProizvode();
    }, []);

    async function promjena(proizvod) {
        const odgovor = await ProizvodService.promjena(routeParams.sifra, proizvod);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.PROIZVODI_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);
        promjena({
            naziv: podaci.get("naziv"),
            cijena: parseFloat(podaci.get('cijena')),
            nabavljacSifra: odabraniNabavljac?.sifra || 0
        });
    }

    async function traziNabavljaca(uvjet) {
           const odgovor = await NabavljaciService.trazi(uvjet)
           setNabavljaci(odgovor)
        }

    return (
        <>
            <h3>Promjena proizvod</h3>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" defaultValue={proizvod.naziv} required />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" step={0.01} name="cijena"  />
                </Form.Group>               

                <Form.Group controlId="nabavljacSifra">
                    <Form.Label>Traži nabavljača</Form.Label>
                    <AsyncTypeahead
                        ref={typeaheadRef}
                        id="uvjet"
                        minLength={1}
                        emptyLabel="Nema rezultata"
                        searchText="Tražim..."
                        labelKey={(nabavljac) => `${nabavljac.naziv}`}
                        options={nabavljaci}
                        onSearch={traziNabavljaca}
                        placeholder="Upišite najmanje 1 slova naziva nabavljača"
                        renderMenuItemChildren={(nabavljac) => (
                            <span>{nabavljac.naziv}</span>
                        )}
                        onChange={(selected) => {
                            setOdabraniNabavljac(selected.length > 0 ? selected[0] : null);
                        }}
                    />
                    <p>{odabraniNabavljac ? `${odabraniNabavljac.naziv} ` : "Nije odabran nabavljač"}</p>
                </Form.Group>

                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.PROIZVODI_PREGLED} className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">Promjeni proizvod</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

