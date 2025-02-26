import { useEffect, useState } from "react"
import KupacService from "../../services/KupacService"
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { GrValidate } from "react-icons/gr";



export default function KupciPregled(){

    const[kupci,setKupci]= useState([]);
    const navigate = useNavigate();

    async function dohvatiKupce(){
        const odgovor = await KupacService.get()
        setKupci(odgovor)
    }
    //hook se izvodi prilikom dolaska na stranicu Kupci
    useEffect(()=>{
       dohvatiKupce();
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
    brisanjeKupca(sifra)
}

async function brisanjeKupca(sifra){
    const odgovor = await KupacService.obrisi(sifra);
    if((await odgovor).greska){
        alert(odgovor.poruka)
        return
    }
    dohvatiKupce();
}

    return(
        <>
        <Link
        to={RouteNames.KUPCI_NOVI}
        className="btn btn-success siroko"
        >Dodaj novog kupca</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Broj telefona</th>
                    <th>Adresa</th>
                    <th>Datum rođenja</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {kupci && kupci.map((kupac,index)=>(
                    <tr key={index}>
                        <td>
                            {kupac.ime}                            
                        </td>
                        <td>
                            {kupac.prezime}
                        </td>
                        <td>
                            {kupac.br_tel}
                        </td>
                        <td>
                            {kupac.adresa}
                        </td>
                        <td>
                            {formatirajDatum(kupac.datum_rod)}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/kupci/${kupac.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger" onClick={()=>obrisi (kupac.sifra)}
                            >Obriši</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}