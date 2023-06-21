import { Container, Row, Col, Tab, Nav } from "react-bootstrap"
import fe2 from "../assets/images/fe2.png"
import sl1 from "../assets/images/sl1.png"
import { ProjectCard } from "./ProjectCard"
import "animate.css";
import TrackVisibility from "react-on-screen";
import colorSharp2 from "../assets/images/color-sharp2.png"

const Projects = () => {
    
    const projects = [
        {
            title: "College Dashboard",
            description: "Database for Students",
            imgUrl: fe2,
        },
        {
            title: "StressLess",
            description: "Mental Health Help",
            imgUrl: sl1,
        },
        {
            title: "StressLess",
            description: "Mental Health Help",
            imgUrl: sl1,
        },
        {
            title: "StressLess",
            description: "Mental Health Help",
            imgUrl: sl1,
        },
        {
            title: "StressLess",
            description: "Mental Health Help",
            imgUrl: sl1,
        },
        {
            title: "StressLess",
            description: "Mental Health Help",
            imgUrl: sl1,
        },
    ];
    
    return(
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                    <TrackVisibility>
                    {({isVisible}) =>
                        <div className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                            <h2>Projects</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>}
                    </TrackVisibility>
                        
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                            <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {projects.map((project, index) => {
                                                return(
                                                    <ProjectCard key ={index} {...project} />
                                                )
                                            })}
                                    </Row>
                                </Tab.Pane>  
                                <Tab.Pane eventKey="second">Lorem Ipsum</Tab.Pane>
                                <Tab.Pane eventKey="third">Lorem Ipsum</Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                        
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} alt="Gradd"></img>
        </section>
    )
}
export default Projects;