import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Narudzba')
    .then((odgovor)=>{
        return{greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return{greska:true, poruka: 'Problem kod dohvaćanja narudžbi'}
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Narudzba/' + sifra)
    .then(()=>{
        return{greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return{greska: true, poruka: 'Problem kod brisanja narudžbe!'}
    })
}

async function dodaj(narudzba){
    return await HttpService.post('/Narudzba',narudzba)
    .then((odgovor)=>{
        return{greska: false,poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status) {
            case 400:
                let poruke = '';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return{greska: true, poruka: poruke}
            default:
                return{greska: true,poruka: 'Narudžba se ne može dodati'}
        }
    })
}

async function promjena(sifra,narudzba) {
    return await HttpService.put('/Narudzba/'+ sifra, narudzba)
    .then((odgovor)=>{
        return{greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
                let poruke = '';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
                }
                console.log(poruke)
                return{greska: true, poruka: poruke}
            default:
                return{greska: true,poruka: 'Narudžba se ne može promjeniti'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Narudzba/'+ sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja narudžbe sa šifrom' + sifra}
    })
}

async function traziKupca(uvjet) {
    const odgovor = await NarudzbaService.traziKupca(uvjet);
    if (odgovor.greska) {
        alert(odgovor.poruka);
        return;
    }
    setKupci(odgovor.poruka);
}

async function getStavke_Narudzbe(sifra){
    return await HttpService.get('/Narudzba/Stavke_Narudzbe/'+ sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja stavki narudžbe'}})
}



export default{
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    traziKupca,

    getStavke_Narudzbe
}