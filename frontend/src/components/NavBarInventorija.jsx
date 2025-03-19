import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, RouteNames } from '../constants';
import useAuth from '../pages/hooks/useAuth';

export default function NavBarInventorija(){

    const navigate = useNavigate() 
    const {logout,isLoggedIn}= useAuth();

    function OpenSwaggerURL(){
        window.open(PRODUKCIJA + "/swagger/index.html", "_blank")
    }

    return(        
        <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">Inventorija</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link onClick={()=>navigate(RouteNames.HOME)}>Početna</Nav.Link>

                {isLoggedIn ?(
                    <>
                    <Nav.Link onClick={()=>navigate(RouteNames.NADZORNA_PLOCA)}>Nadzorna ploća</Nav.Link>
                    <NavDropdown title="Programi" id="basic-nav-dropdown">                    
                    <NavDropdown.Item className="no-purple"
                        onClick={()=>navigate(RouteNames.KUPCI_PREGLED)}                    
                    >Kupci</NavDropdown.Item>
                    <NavDropdown.Item className="no-purple"
                        onClick={()=>navigate(RouteNames.NABAVLJACI_PREGLED)}                    
                    >Nabavljači</NavDropdown.Item>
                    <NavDropdown.Item className="no-purple"
                        onClick={()=>navigate(RouteNames.NARUDZBE_PREGLED)}                    
                    >Narudžbe</NavDropdown.Item>
                    <NavDropdown.Item className="no-purple"
                        onClick={()=>navigate(RouteNames.PROIZVODI_PREGLED)}                    
                    >Proizvodi</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className="no-purple" href={ BACKEND_URL + '/swagger/'} target='_blank'>Swagger</Nav.Link>
                    <Nav.Link className="no-purple" href="/images/eraDijagram.png" target='_blank'>Era Dijagram</Nav.Link>
                    <Nav.Link onClick={logout}>Odjava</Nav.Link>
                    </>
                        ):(                 
                            <Nav.Link onClick={() => navigate(RouteNames.LOGIN)}>Prijava</Nav.Link>
                        )}
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
}