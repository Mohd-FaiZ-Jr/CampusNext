export default function ContactPage() {
    return (
        <div className="bg-white">

            {/* ================= HERO ================= */}
            <section className="relative bg-gradient-to-br from-[#0b1220] to-[#111827] text-white py-32 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">

                    <h1 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight leading-tight mb-6">
                        Get in Touch With Us
                    </h1>

                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-poppins leading-relaxed">
                        Have questions about listings, bookings, or partnerships?
                        Our team is here to help you every step of the way.
                    </p>
                </div>

                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
            </section>


            {/* ================= CONTACT SECTION ================= */}
            <section className="max-w-7xl mx-auto px-6 py-28">
                <div className="grid md:grid-cols-2 gap-16">

                    {/* Left Contact Info */}
                    <div>

                        <span className="text-sm uppercase tracking-wider text-indigo-600 font-nunito font-semibold">
                            Contact Information
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mt-4 mb-8">
                            Let’s start a conversation
                        </h2>

                        <div className="space-y-6 text-gray-600 font-poppins">

                            <div>
                                <p className="font-semibold text-gray-900">Email</p>
                                <p className="text-sm">support@campusnest.com</p>
                            </div>

                            {/* <div>
                                <p className="font-semibold text-gray-900">Phone</p>
                                <p className="text-sm">+91 98765 43210</p>
                            </div> */}

                            <div>
                                <p className="font-semibold text-gray-900">Office Hours</p>
                                <p className="text-sm">Monday – Friday, 9:00 AM – 6:00 PM</p>
                            </div>

                        </div>

                        {/* Subtle Divider */}
                        <div className="mt-10 h-px w-16 bg-indigo-500/40" />
                    </div>


                    {/* Right Form */}
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                        <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-8">
                            Send us a message
                        </h3>

                        <form className="space-y-6">

                            <div>
                                <label className="block text-sm font-nunito font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-poppins"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-nunito font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-poppins"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-nunito font-semibold text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-poppins resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold font-nunito shadow-md transition"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>
                </div>
            </section>


            {/* ================= SUPPORT CARDS ================= */}
            <section className="bg-gray-50 py-28 px-6">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mb-4">
                            How Can We Help?
                        </h2>
                        <p className="text-gray-600 font-poppins">
                            Choose the area that best fits your query.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">

                        <SupportCard
                            title="Student Support"
                            desc="Questions about bookings, listings, or account access."
                        />

                        <SupportCard
                            title="Property Owners"
                            desc="Interested in listing your property on CampusNest?"
                        />

                        <SupportCard
                            title="Partnerships"
                            desc="Collaborate with us to support student housing initiatives."
                        />

                    </div>
                </div>
            </section>


            {/* ================= CTA ================= */}
            <section className="max-w-5xl mx-auto px-6 py-28 text-center">

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-raleway mb-6">
                    We typically respond within 24 hours
                </h2>

                <p className="text-gray-600 font-poppins mb-10">
                    Your questions matter. Our team is committed to providing timely and helpful support.
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

function SupportCard({ title, desc }) {
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