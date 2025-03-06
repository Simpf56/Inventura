import { useState, useEffect, useRef } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { RouteNames } from "../../constants";
import NabavljaciService from "../../services/NabavljaciService";
import ProizvodService from "../../services/ProizvodService";

export default function ProizvodiDodaj() {
    const navigate = useNavigate();
    const [nabavljaci, setNabavljaci] = useState([]);
    const [odabraniNabavljac, setOdabraniNabavljac] = useState(null);
    const typeaheadRef = useRef(null);

    useEffect(() => {
        
    }, []);

    

    async function dodaj(proizvod) {
        const odgovor = await ProizvodService.dodaj(proizvod);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.PROIZVODI_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);
        dodaj({
            naziv: podaci.get("naziv"),
            cijena: parseFloat(podaci.get('cijena')),
            nabavljacSifra: odabraniNabavljac?.sifra || 0
        });
    }

    async function traziNabavljaca(uvjet) {
        const odgovor = await NabavljaciService.trazi(uvjet);
        setNabavljaci(odgovor);  // Provjeri da nije undefined
    }

    return (
        <>
            <h2>Dodavanje proizvoda</h2>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="datum">
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
                    <Col xs={6}>
                        <Link to={RouteNames.PROIZVODI_PREGLED} className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit" className="siroko">Dodaj proizvod</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}