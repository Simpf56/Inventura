import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Stavka_Narudzbe')    
    .then((odgovor)=>{
        // console.log(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/stavke_narudzbe/' + sifra)    
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Stavka narudžbe ne postoji!'}
    })
}

async function obrisi(sifra){
    return await HttpService.delete('/stavke_narudzbe/'+sifra)
    .then((odgovor)=>{
        return{greska:false, poruka: odgovor.data}
    })
    .catch(()=>{return{greska:true, poruka:'Stavku narudžbe nije moguće obrisati.'}})
}

async function dodaj(Stavka_Narudzbe){
    return await HttpService.post('/stavke_narudzbe',Stavka_Narudzbe)
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
                    return { greska:true, poruka: 'Stavka narudžbe se nemože dodati'}
        }
    })
}

async function dohvatiSve() {
    return await HttpService.get('/stavke_narudzbe')
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: 'Greška prilikom dohvaćanja stavke' };
        });
}


async function promijeni(sifra,Stavka_Narudzbe){
    return HttpService.put('/stavke_narudzbe/'+sifra, Stavka_Narudzbe)
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
            return{greska : true, poruka : 'Stavka se nemože promijeniti'}
        }
    })
            
}

async function traziStavku(uvjet){
    return await HttpService.get('/stavke_narudzbe/trazi/'+uvjet)
    .then((odgovor)=>{        
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja stavke.'}})
}


export default{
    get,
    getBySifra,
    promijeni,
    dodaj,
    obrisi,
    traziStavku,
    dohvatiSve
}