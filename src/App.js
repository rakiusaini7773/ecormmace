
import './App.css';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import AppPromoBanner from './LandingPage/AppPromoBanner';
import BodycareSpotlight from './LandingPage/BodycareSpotlight';
import DetanSpotlight from './LandingPage/DetanSpotlight';
import FoxtaleHighlight from './LandingPage/FoxtaleHighlight';
import LatestPosts from './LandingPage/LatestPosts';
import ProductPlaybook from './LandingPage/ProductPlaybook';
import SkinHelpSection from './LandingPage/SkinHelpSection';
import TantrumSlider from './LandingPage/TantrumSlider';
import { Landing } from './pages/Landing';
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div>
      <AllRoutes />
    </div>

  );
}

export default App;
