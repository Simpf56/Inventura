import { useEffect, useState } from "react"
import NarudzbaService from "../../services/NarudzbaService";
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function NarudzbePregled(){

    const navigate = useNavigate()

    const[narudzbe, setNarudzbe] = useState();

    async function dohvatiNarudzbe(){
        const odgovor = await NarudzbaService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setNarudzbe(odgovor.poruka)
    } 

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu Smjerovi
    useEffect(()=>{
       dohvatiNarudzbe();
    },[])

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.')
    }

    // function vaucer(v){
    //     if(v==null) return 'gray'
    //     if(v) return 'green'
    //     return 'red'
    // }

    async function brisanjeNarudzbe(sifra) {
        
        const odgovor = await NarudzbaService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiNarudzbe();
    }

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeNarudzbe(sifra)
    }
    


    return(
        <>
        <Link to={RouteNames.NARUDZBE_NOVI}
        className="btn btn-success siroko">Dodaj novu narudžbu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ukupan iznos</th>
                    <th>Datum</th>
                    <th>Status</th>
                    <th>Prezime kupca</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {narudzbe && narudzbe.map((narudzba,index)=>(
                    <tr key={index}>
                        <td className="sredina">
                            {narudzba.ukupan_iznos}
                        </td>
                        <td>{formatirajDatum(narudzba.datum)}</td>
                        <td>{narudzba.status}</td>
                        <td>{narudzba.kupacPrezime}</td>                        
                        <td>
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(narudzba.sifra)}
                            >
                                Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            onClick={()=>navigate(`/narudzbe/${narudzba.sifra}`)}
                            >
                                Promjena
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}