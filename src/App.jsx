import Hero from './components/Hero';
import Demo from './components/Demo';

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
      {/* footer */}
      <div className="mb-4 text-center text-gray-700 whitespace-nowrap animate-glow">
        Developed by{' '}
        <span
          onClick={() => window.open('https://linkedin.com/in/ulugbekswe')}
          className="text-blue-900 cursor-pointer"
        >
          Ulugbek
        </span>
      </div>
    </main>
  );
}

export default App;
