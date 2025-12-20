export default function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-emerald-400 text-sm font-medium">
                🎓 Trusted by 10,000+ Students
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Student Housing
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover verified, affordable housing near your campus. Connect
              with trusted landlords and secure your ideal student home in
              minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50">
                <span className="relative z-10">Find Housing</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
              </button>
              
              <button className="border-2 border-zinc-700 hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-emerald-500/5">
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Students Choose Us
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Everything you need to find safe, verified housing near campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 rounded-3xl transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  Verified Listings
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Every property is verified by our team to ensure quality and
                  safety standards.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-8 rounded-3xl hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-3xl transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  Secure Payments
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Safe payment processing with protection for both students and
                  landlords.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-8 rounded-3xl hover:border-violet-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 rounded-3xl transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-violet-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  Location Search
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Find housing within walking distance of your campus with
                  precise location filters.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-8 rounded-3xl hover:border-rose-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  Direct Chat
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Connect instantly with property owners through our secure
                  messaging platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Three simple steps to find your perfect student home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-500"></div>
            
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/50">
                  1
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">
                Search Near Campus
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Enter your college name to discover available housing options
                within your preferred distance.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-50 animate-pulse delay-300"></div>
                <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-amber-500/50">
                  2
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">
                Compare Properties
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Browse verified listings, compare prices, amenities, and read
                reviews from other students.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-50 animate-pulse delay-700"></div>
                <div className="relative bg-gradient-to-br from-violet-500 to-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-violet-500/50">
                  3
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">
                Book & Move In
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Secure your booking with our safe payment system and move into
                your new home with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 leading-relaxed">
            Join thousands of students who have found safe, affordable housing
            near their campus. Start your search today.
          </p>
          
          <button className="group relative bg-white hover:bg-zinc-100 text-emerald-600 px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </section>
    </>
  );
}