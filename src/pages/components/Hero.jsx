export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Mind map background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 leading-tight">
          Unravel Stories, One Map at a Time
        </h1>
        <p className="text-xl md:text-2xl text-indigo-700">
          Explore character relationships and storylines with AI-powered
          visualizations.
        </p>
        <button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
