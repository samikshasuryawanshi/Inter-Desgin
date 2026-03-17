import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="font-sans antialiased text-neutral-800 bg-[#F5F5F7]">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
