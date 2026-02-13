import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import Property from "@/app/backend/models/Property.model";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query || query.length < 2) {
            return NextResponse.json([], { status: 200 });
        }

        // Use regex for flexible matching (case-insensitive)
        const regex = new RegExp(query, "i");

        // Fetch matching Properties (by Title)
        const propertySuggestions = await Property.find({
            title: { $regex: regex }
        })
            .select("title _id")
            .limit(5)
            .lean();

        // Fetch matching Colleges (by College Name)
        const collegeSuggestions = await Property.find({
            college: { $regex: regex }
        })
            .select("college")
            .limit(5)
            .lean();

        // Format suggestions with type
        const formattedProperties = propertySuggestions.map(p => ({
            text: p.title,
            type: "property",
            id: p._id
        }));

        // Deduplicate colleges and format
        const uniqueColleges = [...new Set(collegeSuggestions.map(p => p.college))];
        const formattedColleges = uniqueColleges.map(c => ({
            text: c,
            type: "college"
        }));

        // Combine and limit total results
        const combinedSuggestions = [...formattedProperties, ...formattedColleges].slice(0, 8);

        return NextResponse.json(combinedSuggestions, { status: 200 });

    } catch (error) {
        console.error("Autocomplete API Error:", error);
        return NextResponse.json([], { status: 500 });
    }
}
