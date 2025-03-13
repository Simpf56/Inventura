import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarInventorija from './components/NavBarInventorija'
import { Route, Routes } from 'react-router-dom'
import Pocetna from './pages/Pocetna'
import { RouteNames } from './constants'
import KupciPregled from './pages/kupci/KupciPregled'
import KupciDodaj from './pages/kupci/KupciDodaj'
import KupciPromjena from './pages/kupci/KupciPromjena'
import NabavljaciPregled from './pages/nabavljaci/NabavljaciPregled'
import NabavljaciDodaj from './pages/nabavljaci/NabavljaciDodaj'
import NabavljaciPromjena from './pages/nabavljaci/NabavljaciPromjena'
import NarudzbePregled from './pages/narudzbe/NarudzbePregled'
import NarudzbeDodaj from './pages/narudzbe/NarudzbeDodaj'
import NarudzbePromjena from './pages/narudzbe/NarudzbePromjena'
import ProizvodiPregled from './pages/proizvodi/ProizvodiPregled'
import ProizvodiDodaj from './pages/proizvodi/ProizvodiDodaj'
import ProizvodiPromjena from './pages/proizvodi/ProizvodiPromjena'
import Stavke_NarudzbePromjena from './pages/narudzbe/Stavke_NarudzbePromjena'

function App() {

  return (
    <>
      <div className='pozadina'>
      <Container>
        <NavBarInventorija/>

        <Routes>
          <Route path={RouteNames.HOME} element = {<Pocetna />} />
          <Route path={RouteNames.KUPCI_PREGLED} element = {<KupciPregled/>} />
          <Route path={RouteNames.KUPCI_NOVI} element = {<KupciDodaj/>} />
          <Route path={RouteNames.KUPCI_PROMJENA} element = {<KupciPromjena/>} />

          <Route path={RouteNames.NABAVLJACI_PREGLED} element ={<NabavljaciPregled/>}/>
          <Route path={RouteNames.NABAVLJACI_NOVI} element ={<NabavljaciDodaj/>}/>
          <Route path={RouteNames.NABAVLJACI_PROMJENA} element ={<NabavljaciPromjena/>}/>

          <Route path={RouteNames.NARUDZBE_PREGLED} element ={<NarudzbePregled/>}/>
          <Route path={RouteNames.NARUDZBE_NOVI} element={<NarudzbeDodaj/>}/>
          <Route path={RouteNames.NARUDZBE_PROMJENA} element={<NarudzbePromjena/>}/>
          <Route path={RouteNames.STAVKE_NARUDZBE_PROMJENA} element ={<Stavke_NarudzbePromjena/>}/>

          <Route path={RouteNames.PROIZVODI_PREGLED} element ={<ProizvodiPregled/>}/>
          <Route path={RouteNames.PROIZVODI_NOVI} element ={<ProizvodiDodaj/>}/>
          <Route path={RouteNames.PROIZVODI_PROMJENA} element ={<ProizvodiPromjena/>}/>
          

        </Routes>

        <hr/>
        &copy; Antonijo Šimpf 2025
      </Container>
      </div>
    
    </>
  )
}

export default App
