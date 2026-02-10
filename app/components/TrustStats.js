import { Users, Home, GraduationCap } from "lucide-react";
import StatCard from "./StatCard";

const TrustStats = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Trusted by students & owners
                </h2>
                <p className="text-gray-600">
                    CampusNest connects students with verified homes and reliable property
                    owners, creating a rental experience built on trust and transparency.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-8 md:grid-cols-3">
                <StatCard
                    icon={<Users className="w-7 h-7" />}
                    value="500+"
                    title="Trusted Owners"
                    description="Property owners verified for authenticity, safety, and reliability."
                />

                <StatCard
                    icon={<Home className="w-7 h-7" />}
                    value="2,000+"
                    title="Properties Listed"
                    description="Student-friendly homes curated near major colleges and universities."
                />

                <StatCard
                    icon={<GraduationCap className="w-7 h-7" />}
                    value="10,000+"
                    title="Students Benefited"
                    description="Students who found safe, comfortable housing without brokerage stress."
                />
            </div>
        </section>
    );
};

export default TrustStats;
