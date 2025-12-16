import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        if (!file) {
            return NextResponse.json(
                { error: "Missing file" },
                { status: 400 }
            );
        }

        const cloudName = "dnjtk8hsj";
        const preset = "noodles";
        const folder = formData.get("folder");

        if (!cloudName || !preset) {
            return NextResponse.json(
                { error: "Cloudinary config missing" },
                { status: 500 }
            );
        }

        const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const uploadForm = new FormData();
        uploadForm.append("file", file);
        uploadForm.append("upload_preset", preset);
        if (folder) uploadForm.append("folder", folder);

        const res = await fetch(endpoint, {
            method: "POST",
            body: uploadForm,
        });

        const text = await res.text();

        if (!res.ok) {
            return NextResponse.json(
                { error: text },
                { status: res.status }
            );
        }

        const json = JSON.parse(text);
        return NextResponse.json(json);
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message || "Upload failed" },
            { status: 500 }
        );
    }
}