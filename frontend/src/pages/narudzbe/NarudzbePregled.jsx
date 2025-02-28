// import { useEffect, useState } from "react"
// import SmjerService from "../../services/SmjerService"
// import { Button, Table } from "react-bootstrap";
// import { NumericFormat } from "react-number-format";
// import moment from "moment";
// import { GrValidate } from "react-icons/gr";
// import { Link, useNavigate } from "react-router-dom";
// import { RouteNames } from "../../constants";


// export default function SmjeroviPregled(){

//     const navigate = useNavigate()

//     const[smjerovi, setSmjerovi] = useState();

//     async function dohvatiSmjerove(){
//         const odgovor = await SmjerService.get();
//         if(odgovor.greska){
//             alert(odgovor.poruka)
//             return
//         }
//         //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
//         setSmjerovi(odgovor.poruka)
//     } 

//     // Ovaj hook (kuka) se izvodi dolaskom na stranicu Smjerovi
//     useEffect(()=>{
//        dohvatiSmjerove();
//     },[])

//     function formatirajDatum(datum){
//         if(datum==null){
//             return 'Nije definirano';
//         }
//         return moment.utc(datum).format('DD. MM. YYYY.')
//     }

//     function vaucer(v){
//         if(v==null) return 'gray'
//         if(v) return 'green'
//         return 'red'
//     }

//     function obrisi(sifra){
//         if(!confirm('Sigurno obrisati')){
//             return;
//         }
//         brisanjeSmjera(sifra)
//     }

//     async function brisanjeSmjera(sifra) {
        
//         const odgovor = await SmjerService.brisanje(sifra);
//         if(odgovor.greska){
//             alert(odgovor.poruka)
//             return
//         }
//         dohvatiSmjerove();
//     }


//     return(
//         <>
//         <Link to={RouteNames.SMJER_NOVI}
//         className="btn btn-success siroko">Dodaj novi smjer</Link>
//         <Table striped bordered hover responsive>
//             <thead>
//                 <tr>
//                     <th>Naziv</th>
//                     <th>Trajanje</th>
//                     <th>Cijena</th>
//                     <th>Izvodi se od</th>
//                     <th>Vaučer</th>
//                     <th>Akcija</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {smjerovi && smjerovi.map((smjer,index)=>(
//                     <tr key={index}>
//                         <td>
//                             {smjer.naziv}
//                         </td>
//                         <td className={smjer.trajanje==null ? 'sredina' : 'desno'}>
//                             {smjer.trajanje==null ? 'Nije definirano' : smjer.trajanje}
//                         </td>
//                         <td className={smjer.cijenaSmjera==null ? 'sredina' : 'desno'}>

//                              {smjer.cijenaSmjera==null ? 'Nije definirano' : 
//                              <NumericFormat 
//                              value={smjer.cijenaSmjera}
//                              displayType={'text'}
//                              thousandSeparator='.'
//                              decimalSeparator=','
//                              prefix={'€'}
//                              decimalScale={2}
//                              fixedDecimalScale
//                              />
                             
//                              }
//                         </td>
//                         <td className="sredina">
//                             {formatirajDatum(smjer.izvodiSeOd)}
//                         </td>
//                         <td className="sredina">
//                             <GrValidate 
//                             size={30}
//                             color={vaucer(smjer.vaucer)}
//                             />
                            
//                         </td>
//                         <td>
//                             <Button
//                             variant="danger"
//                             onClick={()=>obrisi(smjer.sifra)}
//                             >
//                                 Obriši
//                             </Button>
//                             &nbsp;&nbsp;&nbsp;
//                             <Button
//                             onClick={()=>navigate(`/smjerovi/${smjer.sifra}`)}
//                             >
//                                 Promjena
//                             </Button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//         </>
//     )
// }