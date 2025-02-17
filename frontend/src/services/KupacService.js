import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Kupac')    
    .then((odgovor)=>{
        // console.log(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra){
    return await HttpService.get('/Kupac/' + sifra)    
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(kupac){
    return HttpService.post('/Kupac',kupac)
    .then(()=>{return{greska: false, poruka: 'Dodano'}})
    .catch(()=>{return{greska:true,poruka: 'Problem kod dodavanja'}})
}

async function promijeni(sifra,kupac){
    return HttpService.put('/Kupac/'+sifra, kupac)
    .then(()=>{return{greska:false, poruka: 'Dodano'}})
    .catch(()=>{return{greska:true, poruka:'Problem kod dodavanja'}})
}

async function obrisi(sifra){
    return HttpService.delete('/Kupac/'+sifra)
    .then(()=>{return{greska:false, poruka: 'Obrisano'}})
    .catch(()=>{return{greska:true, poruka:'Kupca nije moguće obrisati.'}})
}

export default{
    get,
    getBySifra,
    promijeni,
    dodaj,
    obrisi
}