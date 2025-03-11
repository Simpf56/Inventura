import { HttpService } from "./HttpService";


async function get(sifra){
    return await HttpService.get('/Stavka_Narudzbe/' + sifra)    
    .then((odgovor)=>{
        console.log(odgovor)
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}



async function getBySifra(sifra){
    return await HttpService.get('/Stavka_Narudzbe/' + sifra)    
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Stavka narudžbe ne postoji!'}
    })
}

async function obrisi(sifra){
    return await HttpService.delete('/Stavka_Narudzbe/'+sifra)
    .then((odgovor)=>{
        return{greska:false, poruka: odgovor.data}
    })
    .catch(()=>{return{greska:true, poruka:'Stavku nije moguće obrisati.'}})
}

async function dodaj(stavka_narudzbe){
    return await HttpService.post('/Stavka_Narudzbe',stavka_narudzbe)
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
    return await HttpService.get('/Stavka_Narudzbe')
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: 'Greška prilikom dohvaćanja stavke narudžbe' };
        });
}


async function promjena(sifra,stavka_narudzbe){
    return HttpService.put('/Stavka_Narudzbe/'+sifra, stavka_narudzbe)
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



export default{
    get,
    getBySifra,
    promjena,
    dodaj,
    obrisi,
    dohvatiSve
}