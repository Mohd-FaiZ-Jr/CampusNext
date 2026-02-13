"use client";

import Layout from "../components/Layout";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const toc = [
    { id: "s1", label: "Acceptance" },
    { id: "s2", label: "User Accounts" },
    { id: "s3", label: "Listings" },
    { id: "s4", label: "Conduct" },
    { id: "s5", label: "Verification" },
    { id: "s6", label: "IP Rights" },
    { id: "s7", label: "Liability" },
    { id: "s8", label: "Termination" },
    { id: "s9", label: "Changes" },
    { id: "s10", label: "Contact" },
];

export default function TermsOfServicePage() {
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
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                            <span className="text-indigo-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest font-poppins">Legal</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white font-montserrat mt-2">Terms of Service</h1>
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

                            <Block id="s1" num="01" title="Acceptance of Terms">
                                <p>
                                    By accessing or using CampusNest (the &quot;Platform&quot;), you agree to be bound by these
                                    Terms of Service. If you disagree with any part of these Terms, you may not access the Platform.
                                </p>
                                <p>
                                    These Terms apply to all visitors, users, students, landlords, and others who access
                                    or use the Platform.
                                </p>
                            </Block>

                            <Block id="s2" num="02" title="User Accounts">
                                <p>
                                    When you create an account, you must provide accurate and current information.
                                    Failure to do so constitutes a breach of the Terms.
                                </p>
                                <Bullets items={[
                                    "You are responsible for safeguarding your password",
                                    "You agree not to disclose your password to any third party",
                                    "You must notify us immediately of any security breach",
                                    "You may not use another person's name as a username",
                                ]} />
                            </Block>

                            <Block id="s3" num="03" title="Property Listings">
                                <p>
                                    CampusNest provides a platform for landlords to list student housing and for students
                                    to discover properties. By listing a property, you agree to:
                                </p>
                                <Bullets items={[
                                    "Provide accurate and truthful property information",
                                    "Maintain up-to-date listing information",
                                    "Not engage in misleading or deceptive practices",
                                    "Comply with all applicable rental laws and regulations",
                                ]} />
                            </Block>

                            <Block id="s4" num="04" title="User Conduct">
                                <p>You agree not to use the Platform to:</p>
                                <Bullets items={[
                                    "Upload unlawful, harmful, or abusive content",
                                    "Impersonate any person or entity",
                                    "Interfere with or disrupt the Platform",
                                    "Collect personal data about other users without consent",
                                    "Use the Platform for unauthorized commercial purposes",
                                ]} />
                            </Block>

                            <Block id="s5" num="05" title="Verification Process">
                                <p>
                                    CampusNest may verify landlords and listings. You acknowledge that:
                                </p>
                                <Bullets items={[
                                    "Verification does not constitute an endorsement by CampusNest",
                                    "CampusNest may reject, suspend, or remove any listing or account",
                                    "Verified status may be revoked at CampusNest's discretion",
                                ]} />
                            </Block>

                            <Block id="s6" num="06" title="Intellectual Property">
                                <p>
                                    The Platform and its original content, features, and functionality are the exclusive
                                    property of CampusNest, protected by copyright, trademark, and other laws. Our
                                    trademarks may not be used without prior written consent.
                                </p>
                            </Block>

                            <Block id="s7" num="07" title="Limitation of Liability">
                                <p>
                                    CampusNest shall not be liable for any indirect, incidental, special, or consequential
                                    damages resulting from:
                                </p>
                                <Bullets items={[
                                    "Your access to or inability to access the Platform",
                                    "Any conduct or content of third parties on the Platform",
                                    "Any content obtained from the Platform",
                                    "Unauthorized access or alteration of your data",
                                ]} />
                            </Block>

                            <Block id="s8" num="08" title="Termination">
                                <p>
                                    We may terminate or suspend your account immediately, without prior notice, for any
                                    reason, including breach of the Terms. Upon termination, your right to use the
                                    Platform will immediately cease.
                                </p>
                            </Block>

                            <Block id="s9" num="09" title="Changes to Terms">
                                <p>
                                    We reserve the right to modify these Terms at any time. If a revision is material,
                                    we will try to provide at least 30 days&apos; notice before new terms take effect.
                                </p>
                            </Block>

                            <Block id="s10" num="10" title="Contact Us">
                                <p>If you have questions about these Terms, contact us at:</p>
                                <div className="mt-3">
                                    <a
                                        href="mailto:legal@campusnest.com"
                                        className="inline-flex items-center px-4 py-2.5 bg-gray-900 text-white text-xs md:text-sm rounded-xl font-poppins hover:bg-gray-800 transition"
                                    >
                                        legal@campusnest.com
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

function Bullets({ items }) {
    return (
        <div className="space-y-2.5 mt-3">
            {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-500 mt-[9px] shrink-0" />
                    <span className="text-[13px] md:text-sm text-gray-600 leading-relaxed">{item}</span>
                </div>
            ))}
        </div>
    );
}
