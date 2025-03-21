import { useState, useEffect, useRef } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { RouteNames } from "../../constants";
import KupacService from "../../services/KupacService";
import NarudzbaService from "../../services/NarudzbaService";

export default function NarudzbeDodaj() {
    const navigate = useNavigate();
    const [kupci, setKupci] = useState([]);
    const [odabraniKupac, setOdabraniKupac] = useState(null);
    const typeaheadRef = useRef(null);

    useEffect(() => {
        
    }, []);

    async function traziKupca(uvjet) {
       const odgovor = await KupacService.trazi(uvjet)
       setKupci(odgovor)
    }

    async function dodaj(narudzba) {
        const odgovor = await NarudzbaService.dodaj(narudzba);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.NARUDZBE_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);
        dodaj({
            ukupan_iznos: podaci.get("ukupan_iznos"),
            datum: podaci.get("datum"),
            status: podaci.get("status"),
            kupacSifra: odabraniKupac?.sifra || 0
        });
    }

    return (
        <>
            <h2>Dodavanje narudžbe</h2>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ukupan_iznos">
                    <Form.Label>Ukupan iznos</Form.Label>
                    <Form.Control type="number" name="ukupan_iznos" required />
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="date" name="datum" />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status">
                        <option value="Zaprimljeno">Zaprimljeno</option>
                        <option value="U obradi">U obradi</option>
                        <option value="Poslano">Poslano</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="kupacSifra">
                    <Form.Label>Traži kupca</Form.Label>
                    <AsyncTypeahead
                        ref={typeaheadRef}
                        id="uvjet"
                        minLength={1}
                        emptyLabel="Nema rezultata"
                        searchText="Tražim..."
                        labelKey={(kupac) => `${kupac.ime} ${kupac.prezime}`}
                        options={kupci}
                        onSearch={traziKupca}
                        placeholder="Upišite najmanje 1 slova prezimena kupca"
                        renderMenuItemChildren={(kupac) => (
                            <span>{kupac.ime} {kupac.prezime}</span>
                        )}
                        onChange={(selected) => {
                            setOdabraniKupac(selected.length > 0 ? selected[0] : null);
                        }}
                    />
                    <p>{odabraniKupac ? `${odabraniKupac.prezime} ${odabraniKupac.ime}` : "Nije odabran kupac"}</p>
                </Form.Group>

                <Row className="akcije">
                    <Col xs={6}>
                        <Link to={RouteNames.NARUDZBE_PREGLED} className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit" className="siroko">Dodaj narudžbu</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}