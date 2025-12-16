import { useCallback, useRef, useState } from "react";

type UploadResult = {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    [k: string]: any;
};

type Options = {
    folder?: string;
    maxFileSizeMB?: number;
    accept?: string[];
};

export function useCloudinaryUpload({
    folder,
    maxFileSizeMB,
    accept,
}: Options = {}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const controllerRef = useRef<AbortController | null>(null);

    const reset = () => {
        setUploading(false);
        setProgress(0);
        setError(null);
    };

    const abort = () => {
        controllerRef.current?.abort();
        setUploading(false);
    };

    const upload = useCallback(
        async (file: File): Promise<UploadResult> => {
            if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
                throw new Error(`File too large. Maximum ${maxFileSizeMB}MB`);
            }

            if (accept && !accept.includes(file.type)) {
                throw new Error(`Unsupported format: ${file.type}`);
            }

            setUploading(true);
            setProgress(0);
            setError(null);

            const form = new FormData();
            form.append("file", file);
            if (folder) form.append("folder", folder);

            const controller = new AbortController();
            controllerRef.current = controller;

            const res = await fetch("/api/upload", {
                method: "POST",
                body: form,
                signal: controller.signal,
            });

            const text = await res.text();
            let json: any;

            try {
                json = JSON.parse(text);
            } catch {
                throw new Error(text);
            }

            if (!res.ok) {
                setUploading(false);
                setError(json?.error || "Upload failed");
                throw new Error(json?.error || "Upload failed");
            }

            setUploading(false);
            setProgress(100);
            return json as UploadResult;
        },
        [folder, maxFileSizeMB, accept]
    );

    return { upload, uploading, progress, error, reset, abort };
}