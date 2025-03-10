import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { GrValidate } from "react-icons/gr";
import ProizvodService from "../../services/ProizvodService";



export default function ProizvodiPregled(){

    const[proizvodi,setProizvodi]= useState([]);
    const navigate = useNavigate();

    async function dohvatiProizvode(){
        await ProizvodService.get()
        .then((odgovor)=>{
            setProizvodi(odgovor);
        })
        .catch((e)=>{console.log(e)});
    }

    useEffect(()=>{
       dohvatiProizvode();
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
        const odgovor = await ProizvodService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiProizvode();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    return(
        <>
        <Link
        to={RouteNames.PROIZVODI_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi proizvod</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Cijena</th>
                    <th>Nabavljač</th>
                </tr>
            </thead>
            <tbody>
                {proizvodi && proizvodi.map((e,index)=>(
                    <tr key={index}>
                        <td>
                            {e.naziv}                            
                        </td>
                        <td>
                            {e.cijena}
                        </td>
                        <td>
                            {e.nabavljacNaziv}
                        </td>
                        <td>
                            <Button
                            onClick={()=>navigate(`/proizvodi/${e.sifra}`)}
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