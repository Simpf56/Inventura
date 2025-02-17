import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import NabavljaciService from "../../services/NabavljaciService";



export default function NabavljaciPregled(){

    const[nabavljaci,setNabavljaci]= useState([]);
    const navigate = useNavigate();

    async function dohvatiNabavljace(){
        const odgovor = await NabavljaciService.get()
        setNabavljaci(odgovor)
    }
    //hook se izvodi prilikom dolaska na stranicu Kupci
    useEffect(()=>{
       dohvatiNabavljace();
    },[])


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

function obrisi(sifra){
    if(!confirm('Sigurno obrisati')){
        return;
    }
    brisanjeNabavljaca(sifra)
}

async function brisanjeNabavljaca(sifra){
    const odgovor = await NabavljaciService.obrisi(sifra);
    if((await odgovor).greska){
        alert(odgovor.poruka);
        return;
    }
    dohvatiNabavljace();
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
                {nabavljaci && nabavljaci.map((nabavljac,index)=>(
                    <tr key={index}>
                        <td>
                            {nabavljac.ime}                            
                        </td>
                        <td>
                            {nabavljac.prezime}
                        </td>
                        <td>
                            {nabavljac.naziv}
                        </td>
                        <td>
                            {nabavljac.kontakt}
                        </td>
                        <td>
                            {nabavljac.br_tel}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/nabavljaci/${nabavljac.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger" onClick={()=>obrisi (nabavljac.sifra)}
                            >Obriši</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}