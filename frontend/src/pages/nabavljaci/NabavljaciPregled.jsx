import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NabavljaciService from "../../services/NabavljaciService";



export default function NabavljaciPregled(){

    const[nabavljaci,setNabavljaci]= useState([]);
    const navigate = useNavigate();

    async function dohvatiNabavljace() {        
        await NabavljaciService.get()
        .then((odgovor)=>{
            setNabavljaci(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }
    //hook se izvodi prilikom dolaska na stranicu Kupci
    useEffect(()=>{
       dohvatiNabavljace();
    },[]);


function formatirajDatum(datum){
    if(datum==null){
        return 'Nije definirano'
    }
    return moment.utc(datum).format('DD.MM.YYYY')
}

// function vaucer(v){
//     if(v = null) return'gray'
//     if(v) return 'green'
//     else return 'red'
// }

async function obrisiAsync(sifra) {
    const odgovor = await NabavljaciService.obrisi(sifra);
    //console.log(odgovor);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    dohvatiNabavljace();
}

function obrisi(sifra){
    obrisiAsync(sifra);
}

    return(
        <>
        <Link
        to={RouteNames.NABAVLJACI_NOVI}
        className="btn btn-success siroko"
        >Dodaj novog nabavljača</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Naziv</th>
                    <th>Kontakt</th>
                    <th>Broj telefona</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {nabavljaci && nabavljaci.map((e,index)=>(
                    <tr key={index}>
                        <td>
                            {e.ime}                            
                        </td>
                        <td>
                            {e.prezime}
                        </td>
                        <td>
                            {e.naziv}
                        </td>
                        <td>
                            {e.kontakt}
                        </td>
                        <td>
                            {e.br_tel}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/nabavljaci/${e.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger" onClick={()=>obrisi (e.sifra)}
                            >Obriši</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}