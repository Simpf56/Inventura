import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Kupac')    
    .then((odgovor)=>{
        console.log(odgovor.data)
    })
    .catch((e)=>{})
}

export default{
    get
}