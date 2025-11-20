// hooks/useCloudinaryUnsignedUpload.ts
import { useCallback, useRef, useState } from 'react';

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
    cloudName?: string;     // mặc định đọc từ env
    folder?: string;        // ví dụ: "avatar"
    maxFileSizeMB?: number; // giới hạn size (optional)
    accept?: string[];      // ví dụ: ['image/jpeg','image/png','image/webp']
};

export function useCloudinaryUnsignedUpload(
    preset = 'noodles',
    {
        cloudName = 'dnjtk8hsj',
        folder,
        maxFileSizeMB,
        accept,
    }: Options = {}
) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0); // 0..100
    const [error, setError] = useState<string | null>(null);
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const reset = useCallback(() => {
        setUploading(false);
        setProgress(0);
        setError(null);
    }, []);

    const abort = useCallback(() => {
        xhrRef.current?.abort();
        setUploading(false);
    }, []);

    const upload = useCallback(async (file: File): Promise<UploadResult> => {
        if (!cloudName) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
        if (!preset) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET');

        // validate optional
        if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
            throw new Error(`File too large. Maximum ${maxFileSizeMB}MB`);
        }
        if (accept && !accept.includes(file.type)) {
            throw new Error(`Unsupported format: ${file.type}`);
        }

        setUploading(true);
        setProgress(0);
        setError(null);

        const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset', preset);
        if (folder) form.append('folder', folder);

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        const p = new Promise<UploadResult>((resolve, reject) => {
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                }
            };

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                try {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const json = JSON.parse(xhr.responseText);
                        setUploading(false);
                        resolve(json);
                    } else {
                        const message = xhr.responseText || `HTTP ${xhr.status}`;
                        setError(message);
                        setUploading(false);
                        reject(new Error(message));
                    }
                } catch (err: any) {
                    setError(err?.message || 'Upload failed');
                    setUploading(false);
                    reject(err);
                }
            };

            xhr.open('POST', endpoint);
            xhr.send(form);
        });

        const result = await p;
        return result;
    }, [cloudName, preset, folder, maxFileSizeMB, accept]);

    return { upload, uploading, progress, error, reset, abort };
}