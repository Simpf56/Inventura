import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Proizvod')    
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}



async function getBySifra(sifra){
    return await HttpService.get('/Proizvod/' + sifra)    
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Proizvod ne postoji!'}
    })
}

async function obrisi(sifra){
    return await HttpService.delete('/Proizvod/'+sifra)
    .then((odgovor)=>{
        return{greska:false, poruka: odgovor.data}
    })
    .catch(()=>{return{greska:true, poruka:'Proizvod nije moguće obrisati.'}})
}

async function dodaj(proizvod){
    return await HttpService.post('/Proizvod',proizvod)
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
                    return { greska:true, poruka: 'Proizvod se nemože dodati'}
        }
    })
}

async function dohvatiSve() {
    return await HttpService.get('/Proizvod')
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: 'Greška prilikom dohvaćanja proizvoda' };
        });
}


async function promijeni(sifra,proizvod){
    return HttpService.put('/Proizvod/'+sifra, proizvod)
    .then((odgovor)=>{
        return{greska:false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status){
            case 400:
                let poruke = '';
                for(const kljuc in e.response.data.errors){
                     poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
            }
            return{greska:true, poruka: poruke}
        default:
            return{greska : true, poruka : 'Proizvod se nemože promijeniti'}
        }
    })
            
}

async function traziProizvod(uvjet){
    return await HttpService.get('/Proizvod/trazi/'+uvjet)
    .then((odgovor)=>{        
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod pretrage proizvoda.'}})
}


export default{
    get,
    getBySifra,
    promijeni,
    dodaj,
    obrisi,
    traziProizvod,
    dohvatiSve
}