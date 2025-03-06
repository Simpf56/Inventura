import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Nabavljac')    
    .then((odgovor)=>{
        // console.log(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra){
    return await HttpService.get('/Nabavljac/' + sifra)    
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(nabavljac){
    return HttpService.post('/Nabavljac',nabavljac)
    .then(()=>{return{greska: false, poruka: 'Dodano'}})
    .catch(()=>{return{greska:true,poruka: 'Problem kod dodavanja'}})
}

async function promijeni(sifra,nabavljac){
    return HttpService.put('/Nabavljac/'+sifra, nabavljac)
    .then(()=>{return{greska:false, poruka: 'Dodano'}})
    .catch(()=>{return{greska:true, poruka:'Problem kod dodavanja'}})
}

async function obrisi(sifra){
    return HttpService.delete('/Nabavljac/'+sifra)
    .then(()=>{return{greska:false, poruka: 'Obrisano'}})
    .catch(()=>{return{greska:true, poruka:'Nabavljaća nije moguće obrisati.'}})
}

async function trazi(uvjet){
    return await HttpService.get('/Nabavljac/trazi?uvjet=' + uvjet)    
    .then((odgovor)=>{
        return odgovor.data;
        
    })
    .catch((e)=>{console.error(e)})
}

export default{
    get,
    getBySifra,
    promijeni,
    dodaj,
    trazi,
    obrisi
}