import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, RouteNames } from '../constants';

export default function NavBarInventorija(){

    const navigate = useNavigate() 

    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand   className='ruka'
                                onClick={()=>navigate(RouteNames.HOME)}
                                >Inventorija</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
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
                </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>
        </>
    )
}