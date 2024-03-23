import { logo } from '../assets';

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="Sumz logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open('https://github.com/tidalu')}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Atricle with <br className="max-md:hidden" />
        <span className="orange_gradient"> OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summrize, an open-source atricle summrizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
}

export default Hero;
