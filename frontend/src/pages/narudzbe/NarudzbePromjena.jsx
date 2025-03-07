import { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NarudzbaService from "../../services/NarudzbaService";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import KupacService from "../../services/KupacService";
import Stavke_NarudzbeService from "../../services/Stavke_NarudzbeService";
import ProizvodService from "../../services/ProizvodService";
import { RxRowSpacing } from "react-icons/rx";

export default function NarudzbePromjena() {
    const [narudzba, setNarudzba] = useState({});
    const [stavke_narudzbe, setStavkeNarudzbe] = useState([]);
    const [proizvodi, setProizvodi] = useState([]);
    const [kupci, setKupci] = useState([]);
    const [odabraniKupac, setOdabraniKupac] = useState(null);
    const navigate = useNavigate();
    const routeParams = useParams();
    const typeaheadRef = useRef(null);

    async function dohvatiNarudzbu() {
        const odgovor = await NarudzbaService.getBySifra(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        let n = odgovor.poruka;
        n.datum = moment.utc(n.datum).format('YYYY-MM-DD');
        setNarudzba(n);
    }

    async function dohvatiProizvod() {
        const odgovor = await ProizvodService.getProizvodi();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setProizvodi(odgovor.poruka);
    }

    async function dohvatiStavka_Narudzbe() {
        const odgovor = await Stavke_NarudzbeService.getByNarudzba(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStavkeNarudzbe(odgovor.poruka);
    }

    async function dohvatiInicijalnePodatke() {
        await dohvatiNarudzbu();
        await dohvatiProizvod();
        await dohvatiStavka_Narudzbe();
    }

    useEffect(() => {
        dohvatiInicijalnePodatke();
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
            ukupan_iznos: parseFloat(podaci.get('ukupan_iznos')),
            datum: moment(podaci.get('datum')).format('YYYY-MM-DD'),
            status: podaci.get('status'),
            kupacSifra: odabraniKupac?.sifra ?? podaci.get('kupacSifra')
        });
    }

    async function traziKupca(uvjet) {
        const odgovor = await KupacService.trazi(uvjet);
        setKupci(odgovor);
    }

    async function obrisi(sifraStavke) {
        const odgovor = await Stavke_NarudzbeService.obrisi(sifraStavke);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        setStavkeNarudzbe(stavke_narudzbe.filter(s => s.sifra !== sifraStavke));
    }

    return (
        <>
            <h3>Promjena narudžbe</h3>
            <Form onSubmit={obradiSubmit}>
                <Row>
                <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
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
                        <Form.Select name="status">
                            <option value="Zaprimljeno">Zaprimljeno</option>
                            <option value="U obradi">U obradi</option>
                            <option value="Poslano">Poslano</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="kupacSifra">
                        <Form.Label>Traži kupca</Form.Label>
                        <AsyncTypeahead
                            positionFixed
                            ref={typeaheadRef}
                            id="uvjet"
                            minLength={3}
                            emptyLabel="Nema rezultata"
                            searchText="Tražim..."
                            labelKey={(kupac) => `${kupac.ime} ${kupac.prezime}`}
                            options={kupci}
                            onSearch={traziKupca}
                            placeholder="Upišite najmanje 3 slova prezimena kupca"
                            renderMenuItemChildren={(kupac) => (
                                <span>{kupac.ime} {kupac.prezime}</span>
                            )}
                            onChange={(selected) => {
                                setOdabraniKupac(selected.length > 0 ? selected[0] : null);
                            }}
                        />
                        <p>{odabraniKupac ? `${odabraniKupac.prezime} ${odabraniKupac.ime}` : "Nije odabran kupac"}</p>
                    </Form.Group>
                </Col>

                <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Količina</th>
                                <th>Cijena</th>
                                <th>Naziv proizvoda</th>
                                <th>Šifra narudžbe</th>
                                <th>Akcija</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stavke_narudzbe.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.kolicina}</td>
                                    <td>{e.cijena}</td>
                                    <td>{e.proizvodNaziv}</td>
                                    <td>{e.narudzbaNaziv}</td>
                                    <td>
                                        <Button onClick={() => navigate(`/stavke_narudzbe/${e.sifra}`)}>Promjena</Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant="danger" onClick={() => obrisi(e.sifra)}>Obriši</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                </Row>                   
                <Row className="akcije">
                    <Col xs={3} sm={6} md={1.5} lg={3} xl={3} xxl={3}>
                        <Link to={RouteNames.NARUDZBE_PREGLED} className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={3} sm={6} md={1.5} lg={3} xl={3} xxl={3}>
                        <Button variant="success" type="submit" className="siroko">Promjeni narudžbu</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

