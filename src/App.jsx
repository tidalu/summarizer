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
      <div className="text-center text-gray-700 whitespace-nowrap animate-glow">
        Developed by{' '}
        <span
          onClick={() => window.open('https://linkedin/in/ulugbekswe')}
          className="text-red-900 cursor-pointer"
        >
          Ulugbek
        </span>
      </div>
    </main>
  );
}

export default App;
