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

function App() {
  

  return (
    <>
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

        </Routes>

        <hr/>
        &copy; Antonijo Šimpf 2025
      </Container>

    </>
  )
}

export default App
