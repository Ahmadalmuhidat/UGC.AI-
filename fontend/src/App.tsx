import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Routes, Route } from 'react-router-dom';
import Plans from './pages/Plans';
import MyGenerations from './pages/MyGenerations';
import Generate from './pages/Generate';
import Results from './pages/Results';
import Loading from './pages/Loading';
import { Toaster } from 'react-hot-toast'

function App() {
	return (
		<>
			<Toaster toastOptions={{
				style: {
					background: '#333',
					color: '#fff',
				}
			}} />
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/plans' element={<Plans />} />
				<Route path='/my-generations' element={<MyGenerations />} />
				<Route path='/generate' element={<Generate />} />
				<Route path='/loading' element={<Loading />} />
				<Route path='/results/:projectId' element={<Results />} />
			</Routes>

			<Footer />
		</>
	);
}
export default App;