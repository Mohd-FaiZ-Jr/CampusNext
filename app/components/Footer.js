export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
            CampusNest
          </h3>
          <p className="text-zinc-500 mb-10 text-lg">
            Connecting students with verified, affordable housing near campus
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-10 mb-12">
            <a
              href="#"
              className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-medium"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm font-medium"
            >
              Contact Us
            </a>
          </div>

          <div className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-600 text-sm">
              © 2024 CampusNest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}