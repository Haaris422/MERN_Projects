import { Container,Row,Col } from "react-bootstrap"
import logo from "../assets/images/logo.svg"
const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-item-center">
                    <Col sm={6}>
                        <img src={logo} alt="Logo"/>
                    </Col>
                    <Col sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                            <a href=""><img src={logo}></img></a>
                            <a href=""><img src={logo}></img></a>
                            <a href=""><img src={logo}></img></a>
                        </div>
                        <p>CopyRight 2023.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
        
    )
}
export default Footer