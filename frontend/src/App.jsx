import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarInventorija from './components/NavBarInventorija'
import { Route, Routes } from 'react-router-dom'
import Pocetna from './pages/Pocetna'
import { RouteNames } from './constants'
import KupciPregled from './pages/kupci/KupciPregled'
import KupciDodaj from './pages/kupci/KupciDodaj'

function App() {
  

  return (
    <>
      <Container>
        <NavBarInventorija/>

        <Routes>
          <Route path={RouteNames.HOME} element = {<Pocetna />} />
          <Route path={RouteNames.KUPCI_PREGLED} element = {<KupciPregled/>} />
          <Route path={RouteNames.KUPCI_NOVI} element = {<KupciDodaj/>} />
        </Routes>

        <hr/>
        &copy; Antonijo Šimpf 2025
      </Container>

    </>
  )
}

export default App
