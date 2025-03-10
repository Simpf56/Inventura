import { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NarudzbaService from "../../services/NarudzbaService";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import KupacService from "../../services/KupacService";
import Stavka_narudzbeService from "../../services/Stavka_narudzbeService";

export default function NarudzbePromjena() {
    const [narudzba, setNarudzba] = useState({});
    const [kupci, setKupci] = useState([]);
    const [odabraniKupac, setOdabraniKupac] = useState(null);
    const navigate = useNavigate();
    const routeParams = useParams();
    const typeaheadRef = useRef(null);
    const [stavke_narudzbe,setStavke_Narudzbe] = useState([]);

    async function dohvatiNarudzbe() {
        const odgovor = await NarudzbaService.getBySifra(routeParams.sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        let n = odgovor.poruka;
        n.datum = moment.utc(n.datum).format('yyyy-MM-DD');
        setNarudzba(n);
    }

    async function dohvatiStavke_Narudzbe(){
        await Stavka_NarudzbeService.get()
        .then((odgovor)=>{
            setStavke_Narudzbe(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    useEffect(() => {
        dohvatiNarudzbe();
        dohvatiStavke_Narudzbe();
    }, []);

    async function promjena(proizvod) {
        const odgovor = await NarudzbaService.promjena(routeParams.sifra, proizvod);
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
            Ukupan_iznos: podaci.get("ukupan_iznos"),
            Datum: podaci.get('datum'),
            Status: podaci.get('status'),
            KupacSifra: odabraniKupac?.sifra || 0
        });
    }

    async function traziKupca(uvjet) {
        const odgovor = await KupacService.trazi(uvjet)
        setKupci(odgovor)
    }

    async function brisanjeStavke_narudzbe(sifra) {
        const odgovor = await Stavka_narudzbeService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiStavke_narudzbe();
    }

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeStavke_narudzbe(sifra)
    }

    return (
        <>
            <h3>Promjena narudžbe</h3>
            <Form onSubmit={obradiSubmit}>
                <Row>
                    <Col md={6}>
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
                            <Form.Select name="status" defaultValue={narudzba.status}>
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
                                onChange={(selected) => setOdabraniKupac(selected.length > 0 ? selected[0] : null)}
                            />
                            <p>{odabraniKupac ? `${odabraniKupac.prezime} ${odabraniKupac.ime}` : "Nije odabran kupac"}</p>
                        </Form.Group>
                        <Row className="mt-3">
                    <Col md={6}>
                        <Link to={RouteNames.NARUDZBE_PREGLED} className="btn btn-danger w-100">Odustani</Link>
                    </Col>
                    <Col md={6}>
                        <Button variant="success" type="submit" className="w-100">Promjeni narudžbu</Button>
                    </Col>
                </Row>
                    </Col>
                    <Col md={6}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Količina</th>
                                    <th>Cijena</th>
                                    <th>Naziv Proizvoda</th>
                                    <th>Šifra Narudžbe</th>
                                    <th>Akcija</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stavke_narudzbe && stavke_narudzbe.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.kolicina}</td>
                                        <td>{e.cijena}</td>
                                        <td>{e.proizvodNaziv}</td>
                                        <td>{e.narudzbaNaziv}</td>                        
                                        <td>
                                            <Button onClick={()=>navigate(`/stavke_narudzbe/${e.sifra}`)}>Promjena</Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button variant="danger" onClick={()=>obrisi (e.sifra)}>Obriši</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>                
            </Form>
        </>
    );
}
