import { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NarudzbaService from "../../services/NarudzbaService";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import KupacService from "../../services/KupacService";
import Stavka_narudzbeService from "../../services/Stavka_NarudzbeService";
import { NumericFormat } from "react-number-format";

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
        await NarudzbaService.getStavke_Narudzbe(routeParams.sifra)
        .then((odgovor)=>{
            setStavke_Narudzbe(odgovor.poruka);
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
        dohvatiStavke_Narudzbe();
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
                        <Table hover responsive bordered className="granica" >
                            <thead>
                                <tr className="table-row">
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
                                        <td>{e.cijena==null ? 'Nije definirano' : 
                                                                     <NumericFormat 
                                                                     value={e.cijena}
                                                                     displayType={'text'}
                                                                     thousandSeparator='.'
                                                                     decimalSeparator=','
                                                                     prefix={'€'}
                                                                     decimalScale={2}
                                                                     fixedDecimalScale
                                                                     />}</td>
                                        <td>{e.proizvodNaziv}</td>
                                        <td>{e.narudzbaNaziv}</td>                        
                                        <td>
                                            <Button variant="success" onClick={()=>navigate(`/stavke_narudzbe/${e.sifra}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"></path>
                                                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"></path>
                                                </svg> 
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button class= "btn btn-outline-danger" variant="danger" type="button" onClick={() => obrisi(e.sifra)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
                                                <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"></path>
                                                </svg> 
                                            </Button>
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
