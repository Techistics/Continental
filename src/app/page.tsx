"use client";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center px-6">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCCA1]/40 to-[#ff9b73]/60 -z-10 blur-3xl opacity-70" />

      {/* Logo or Emoji */}
      <div className="text-6xl mb-4 animate-bounce">🍽️</div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Welcome to <span className="text-[#ff7b00]">Continental</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl max-w-lg mb-8 text-gray-700 dark:text-gray-100">
        A modern restaurant experience built with ❤️ — order, pay, and enjoy
        effortlessly.
      </p>

      {/* Button */}
      <a
        href="/menu"
        className="px-6 py-3 bg-[#ff7b00] text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
      >
        Explore Menu
      </a>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-[#ff7b00]">
        © {new Date().getFullYear()} Continental | Powered by Next.js
      </footer>
    </main>
  );
}