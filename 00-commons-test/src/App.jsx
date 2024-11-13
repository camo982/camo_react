import logo from './logo.svg';
import './App.css';
import ProfileTooltip from './atomics/molecules/ProfileTooltip/ProfileTooltip';

function App() {

  const profileInfo = {
    name: 'Matalia Maria',
    lastName: 'Fernandez',
    email: 'nombre@correo.com',
    domains: '09',
    subdomains: '20',
    urlTyC:'www.google.com'
  };

  return (
    <div className="App" style={{backgroundColor:'beige',height:'800px', alignItems:'right', paddingRight:'20px'}}>
      
      <ProfileTooltip profileInfo={profileInfo}>
        <button>test</button>
      </ProfileTooltip>

    </div>
  );
}

export default App;
