import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';



function App() {

  const {fromLanguage, toLanguage, fromText,result,loading,
        setFromLanguages,interchangeLanguages, setToLanguages, setFromText,setResult} = useStore()

  console.log({fromLanguage})

  return (
    <Container>
      <h1>Camo Translate</h1>

      <Row>
        <Col>
          <h2>From</h2>
          <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguages} />

          <TextArea 
            type={SectionType.From}
            value= {fromText}
            loading={loading}
            onChange= {setFromText}/>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage===AUTO_LANGUAGE} onClick={()=>{
            interchangeLanguages()
          }}>
            <ArrowsIcon/>
          </Button>
        </Col>
        <Col>
          <h2>To</h2>
          <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguages}/>
          <TextArea 
            type={SectionType.To}
            value= {result}
            loading={loading}
            onChange= {setResult}/>
        </Col>
      </Row>
    </Container>
  )
}

export default App
