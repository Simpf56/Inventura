import { useEffect, useState } from "react"
import KupacService from "../../services/KupacService"
import { Table } from "react-bootstrap";



export default function KupciPregled(){

    const[kupci,setKupci]= useState();

    async function dohvatiKupce(){
        const odgovor = await KupacService.get()
        setKupci(odgovor)
    }
    //hook se izvodi prilikom dolaska na stranicu Kupci
    useEffect(()=>{
       dohvatiKupce();
    },[])


    return(
        <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Br telefona</th>
                    <th>Adresa</th>
                    <th>Datum rođenja</th>
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
                            {kupac.datum_rod}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}