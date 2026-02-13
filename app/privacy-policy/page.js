"use client";

import Layout from "../components/Layout";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

const toc = [
    { id: "s1", label: "Introduction" },
    { id: "s2", label: "Information We Collect" },
    { id: "s3", label: "How We Use It" },
    { id: "s4", label: "Disclosure" },
    { id: "s5", label: "Security" },
    { id: "s6", label: "Children" },
    { id: "s7", label: "Your Rights" },
    { id: "s8", label: "Contact" },
];

export default function PrivacyPolicyPage() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <Layout>
            <main className="bg-[#fafafa] min-h-screen">

                {/* Hero — tighter on mobile */}
                <div className="bg-gray-900">
                    <div className="max-w-6xl mx-auto px-5 md:px-6 pt-20 pb-10 md:pt-36 md:pb-16">
                        <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm font-poppins transition mb-6 md:mb-10">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Home
                        </Link>
                        <div className="flex items-center gap-2.5 mb-2">
                            <Shield className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                            <span className="text-indigo-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest font-poppins">Legal</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white font-montserrat mt-2">Privacy Policy</h1>
                        <p className="text-gray-500 text-xs md:text-sm font-poppins mt-2">Last updated — February 13, 2026</p>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto px-5 md:px-6 py-8 md:py-16">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                        {/* Sidebar TOC — hidden on mobile, sticky on desktop */}
                        <aside className="hidden lg:block lg:w-56 shrink-0">
                            <div className="sticky top-28">
                                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-poppins mb-4">
                                    On this page
                                </h4>
                                <nav className="flex flex-col gap-1">
                                    {toc.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollTo(item.id)}
                                            className="text-[13px] text-gray-500 hover:text-gray-900 font-poppins py-1.5 border-l-2 border-gray-200 hover:border-gray-900 pl-4 transition-all text-left"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0 space-y-10 md:space-y-16">

                            <Block id="s1" num="01" title="Introduction">
                                <p>
                                    CampusNest values your privacy. This Privacy Policy explains how we collect, use,
                                    disclose, and safeguard your information when you use our website and mobile application.
                                </p>
                                <p>
                                    Please read this privacy policy carefully. If you do not agree with the terms of this
                                    privacy policy, please do not access the site.
                                </p>
                            </Block>

                            <Block id="s2" num="02" title="Information We Collect">
                                <p>
                                    We may collect information about you in a variety of ways, including:
                                </p>
                                <InfoCard title="Personal Data">
                                    Personally identifiable information such as your name, address, email, telephone number,
                                    and demographic information that you voluntarily provide during registration.
                                </InfoCard>
                                <InfoCard title="Derivative Data">
                                    Information our servers automatically collect — your IP address, browser type,
                                    operating system, access times, and pages viewed before and after accessing the Site.
                                </InfoCard>
                                <InfoCard title="Financial Data">
                                    Payment method details (e.g. credit card number, card brand, expiration date)
                                    collected when you purchase or request information about our services.
                                </InfoCard>
                                <InfoCard title="Geo-Location">
                                    Location-based information from your mobile device to provide location-based services.
                                    You may change this in your device&apos;s settings.
                                </InfoCard>
                            </Block>

                            <Block id="s3" num="03" title="How We Use Your Information">
                                <p>We may use your information to:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mt-3">
                                    {[
                                        "Create and manage your account",
                                        "Process payments and refunds",
                                        "Facilitate student-landlord communication",
                                        "Send account-related emails",
                                        "Enable user-to-user messaging",
                                        "Personalize your experience",
                                        "Monitor and analyze usage trends",
                                        "Notify you of updates",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2.5">
                                            <div className="w-1 h-1 rounded-full bg-indigo-500 mt-[9px] shrink-0" />
                                            <span className="text-[13px] md:text-sm text-gray-600 leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Block>

                            <Block id="s4" num="04" title="Disclosure of Your Information">
                                <p>Your information may be disclosed as follows:</p>
                                <InfoCard title="By Law or to Protect Rights">
                                    If necessary to respond to legal process, investigate violations, or protect the rights,
                                    property, and safety of others.
                                </InfoCard>
                                <InfoCard title="Third-Party Service Providers">
                                    With third parties that perform services for us, including payment processing,
                                    data analysis, email delivery, and hosting.
                                </InfoCard>
                                <InfoCard title="Business Transfers">
                                    In connection with any merger, sale of company assets, financing, or acquisition of our business.
                                </InfoCard>
                            </Block>

                            <Block id="s5" num="05" title="Security of Your Information">
                                <p>
                                    We use administrative, technical, and physical security measures to protect your personal
                                    information. Despite our efforts, no security measures are perfect or impenetrable, and
                                    no method of data transmission can be guaranteed against interception or misuse.
                                </p>
                            </Block>

                            <Block id="s6" num="06" title="Policy for Children">
                                <p>
                                    We do not knowingly solicit information from or market to children under the age of 13.
                                    If you become aware of any data we have collected from children under 13, please contact
                                    us below.
                                </p>
                            </Block>

                            <Block id="s7" num="07" title="Your Rights">
                                <p>
                                    Depending on your location, you may have the right to access, correct, or delete your
                                    personal information. To exercise these rights, please contact us at the email below.
                                </p>
                            </Block>

                            <Block id="s8" num="08" title="Contact Us">
                                <p>If you have questions about this Privacy Policy, contact us at:</p>
                                <div className="mt-3">
                                    <a
                                        href="mailto:privacy@campusnest.com"
                                        className="inline-flex items-center px-4 py-2.5 bg-gray-900 text-white text-xs md:text-sm rounded-xl font-poppins hover:bg-gray-800 transition"
                                    >
                                        privacy@campusnest.com
                                    </a>
                                </div>
                            </Block>

                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

function Block({ id, num, title, children }) {
    return (
        <section id={id} className="scroll-mt-24">
            <div className="flex items-baseline gap-2.5 mb-4">
                <span className="text-[11px] md:text-xs font-bold text-indigo-500/60 font-montserrat">{num}</span>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 font-montserrat">{title}</h2>
            </div>
            <div className="text-sm md:text-[15px] leading-[1.8] text-gray-600 font-raleway space-y-3 md:space-y-4">
                {children}
            </div>
        </section>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 mt-3">
            <h4 className="text-[13px] md:text-sm font-semibold text-gray-900 font-poppins mb-1.5">{title}</h4>
            <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">{children}</p>
        </div>
    );
}
