import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Kupac')    
    .then((odgovor)=>{
        // console.log(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Kupac/' + sifra)    
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Kupac ne postoji!'}
    })
}

async function obrisi(sifra){
    return await HttpService.delete('/Kupac/'+sifra)
    .then((odgovor)=>{
        return{greska:false, poruka: odgovor.data}
    })
    .catch(()=>{return{greska:true, poruka:'Kupca nije moguće obrisati.'}})
}

async function dodaj(kupac){
    return await HttpService.post('/Kupac',kupac)
    .then((odgovor)=>{
        return{greska: false, poruka: odgovor.data}})
    .catch((e)=>{
        switch (e.status){
            case 400:
                let poruka='';
                for(const kljuc in e.response.data.erros){
                    poruke+= kljuc + ': ' + e.response.data.erros[kljuc][0] + '\n';
                }
                return{greska:true, poruka: poruke}
                default:
                    return { greska:true, poruka: 'Kupac se nemože dodati'}
        }
    })
}

async function promijeni(sifra,kupac){
    return HttpService.put('/Kupac/'+sifra, kupac)
    .then(()=>{return{greska:false, poruka: 'Dodano'}})
    .catch(()=>{return{greska:true, poruka:'Problem kod dodavanja'}})
}


export default{
    get,
    getBySifra,
    promijeni,
    dodaj,
    obrisi
}