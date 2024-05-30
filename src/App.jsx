import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, NavLink, Navbar, NavbarCollapse } from 'react-bootstrap';
import { ExpensePage } from './Pages/ExpensePage';
import About from './Pages/AboutPage';
import Navigator from './components/Navigator';

const HomePage = 0;
const AboutPage = 1;

function App() {  
  const [pageNumber, setPageNumber] = useState(HomePage)

  const handleHome = () => {
    setPageNumber(HomePage);
  }
  const handleDeveloper = () => {
    setPageNumber(AboutPage);
  }

  return (
    <div>      
        <Container fluid>
          <Navigator handleHome={handleHome} handleDeveloper={handleDeveloper}/>
          <PageRoute pageProp={pageNumber} />
        </Container>              
    </div>
  )
}

const PageRoute = ({pageProp}) => {
  
  if (pageProp == HomePage){
    return (
      <ExpensePage />
    )
  }
  else if (pageProp == AboutPage){
    return (
      <About />
    )
  }
}

export default App
