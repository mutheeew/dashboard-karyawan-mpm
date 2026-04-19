import { NextRequest, NextResponse } from "next/server";

const BASE_API_URL= process.env.NEXT_PUBLIC_API_URL
const BASE_URL = `${BASE_API_URL}/lanjut/data-karyawan`

console.log("BASE_URL >>>>>>>>", BASE_URL);
console.log("NEXT_PUBLIC_API_URL >>>>>>>>", process.env.NEXT_PUBLIC_API_URL);
export async function GET(request: NextRequest) {
    const res = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    console.log("res >>>>>>>>", res);
    try {
        const text = await res.text();
        const result = text ? JSON.parse(text) : {};
        return NextResponse.json(result, { status: res.status });
    } catch (error) {
        console.error("Failed to parse response:", error);
        return NextResponse.json({ error: 'Failed to parse response.' }, { status: res.status });
    }
}