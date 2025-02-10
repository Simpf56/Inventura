import { useEffect } from "react"
import KupacService from "../../services/KupacService"



export default function KupciPregled(){
    async function dohvatiKupce(){
        const odgovor = KupacService.get()
    }
    //hook se izvodi prilikom dolaska na stranicu Kupci
    useEffect(()=>{
       dohvatiKupce();
    },[])


    return(
        <>
        Ovjde će se vidjeti kupci iz baze!
        </>
    )
}