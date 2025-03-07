import { useEffect, useState } from "react"
import KupacService from "../../services/KupacService"
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { GrValidate } from "react-icons/gr";
import Stavke_NarudzbeService from "../../services/Stavke_NarudzbeService";



export default function Stavke_NarudzbePregled(){

    const[stavke_narudzbe,setStavke_Narudzbe]= useState([]);
    const navigate = useNavigate();

    async function dohvatiStavke_Narudzbe(){
        await Stavke_NarudzbeService.get()
        .then((odgovor)=>{
            setStavke_Narudzbe(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    useEffect(()=>{
       dohvatiStavke_Narudzbe();
    },[])


function formatirajDatum(datum){
    if(datum==null){
        return 'Nije definirano'
    }
    return moment.utc(datum).format('DD.MM.YYYY')
}

async function obrisiAsync(sifra) {
        const odgovor = await Stavke_NarudzbeService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiStavke_Narudzbe();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    return(
        <>
        <Link
        to={RouteNames.STAVKE_NARUDZBE_NOVI}
        className="btn btn-success siroko"
        >Dodaj novu stavku narudžbe</Link>
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
                {stavke_narudzbe && stavke_narudzbe.map((e,index)=>(
                    <tr key={index}>
                        <td>
                            {e.kolicina}                            
                        </td>
                        <td>
                            {e.cijena}
                        </td>
                        <td>
                            {e.proizvodNaziv}
                        </td>
                        <td>
                            {e.narudzbaNaziv}
                        </td>                        
                        <td>
                            <Button
                            onClick={()=>navigate(`/stavke_narudzbe/${e.sifra}`)}
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