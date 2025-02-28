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
        await KupacService.get()
        .then((odgovor)=>{
            setKupci(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

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

async function obrisiAsync(sifra) {
        const odgovor = await KupacService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiKupce();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
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
                {kupci && kupci.map((e,index)=>(
                    <tr key={index}>
                        <td>
                            {e.ime}                            
                        </td>
                        <td>
                            {e.prezime}
                        </td>
                        <td>
                            {e.br_tel}
                        </td>
                        <td>
                            {e.adresa}
                        </td>
                        <td>
                            {formatirajDatum(e.datum_rod)}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/kupci/${e.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger" 
                            onClick={()=>obrisi (e.sifra)}
                            >Obriši</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}