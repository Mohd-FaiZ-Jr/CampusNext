export default function AboutPage() {
    return (
        <div className="bg-white">

            {/* ================= HERO ================= */}
            <section className="relative bg-gradient-to-br from-[#0b1220] to-[#111827] text-white py-32 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">

                    <h1 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight leading-tight mb-6">
                        Building a Better Way for Students to Find Home
                    </h1>

                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-poppins leading-relaxed">
                        CampusNest was created to remove friction, uncertainty, and stress
                        from student housing — replacing it with trust, clarity, and speed.
                    </p>
                </div>

                {/* Subtle Glow */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
            </section>


            {/* ================= MISSION ================= */}
            <section className="max-w-7xl mx-auto px-6 py-28">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="text-sm uppercase tracking-wider text-indigo-600 font-nunito font-semibold">
                            Our Mission
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mt-4 mb-6">
                            Redefining student rentals with trust & transparency
                        </h2>

                        <p className="text-gray-600 leading-relaxed font-poppins text-base">
                            We believe students deserve safe, verified homes without hidden
                            fees or confusing processes. CampusNest simplifies the journey —
                            from discovering properties to securing bookings — with a system
                            designed around clarity and confidence.
                        </p>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                        <img
                            src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
                            alt="Students discussing housing"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>


            {/* ================= STORY ================= */}
            <section className="bg-gray-50 py-28 px-6">
                <div className="max-w-5xl mx-auto text-center">

                    <span className="text-sm uppercase tracking-wider text-indigo-600 font-nunito font-semibold">
                        Our Story
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mt-4 mb-8">
                        Built by students, for students
                    </h2>

                    <p className="text-gray-600 leading-relaxed font-poppins text-base max-w-3xl mx-auto">
                        CampusNest started with a simple frustration — finding student
                        housing was unnecessarily stressful. Endless calls, unclear pricing,
                        and unreliable listings made the experience overwhelming. We built
                        CampusNest to eliminate that chaos and create a platform students
                        can genuinely trust.
                    </p>
                </div>
            </section>


            {/* ================= VALUES ================= */}
            <section className="max-w-7xl mx-auto px-6 py-28">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-gray-600 font-poppins">
                        Principles that guide every decision we make.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    <ValueCard
                        title="Trust First"
                        desc="Every listing is verified and reviewed to ensure safety and authenticity."
                    />

                    <ValueCard
                        title="Student-Centric"
                        desc="Every feature is designed around the real needs of students."
                    />

                    <ValueCard
                        title="Simplicity"
                        desc="We remove unnecessary complexity and make housing effortless."
                    />

                </div>
            </section>


            {/* ================= STATS ================= */}
            <section className="bg-[#0b1220] text-white py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

                    <Stat number="500+" label="Verified Properties" />
                    <Stat number="50+" label="Partner Universities" />
                    <Stat number="10k+" label="Happy Students" />

                </div>
            </section>


            {/* ================= CTA ================= */}
            <section className="max-w-5xl mx-auto px-6 py-28 text-center">

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mb-6">
                    Ready to find your next home?
                </h2>

                <p className="text-gray-600 font-poppins mb-10">
                    Discover verified student-friendly properties near your campus.
                </p>

                <a
                    href="/explore"
                    className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold font-nunito shadow-md transition"
                >
                    Explore Properties
                </a>
            </section>

        </div>
    );
}


/* ================= COMPONENTS ================= */

function ValueCard({ title, desc }) {
    return (
        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-300">

            <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-4">
                {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed font-raleway">
                {desc}
            </p>

        </div>
    );
}

function Stat({ number, label }) {
    return (
        <div>
            <p className="text-4xl font-bold font-montserrat mb-3">
                {number}
            </p>
            <p className="text-gray-400 font-poppins text-sm tracking-wide">
                {label}
            </p>
        </div>
    );
}