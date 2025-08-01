'use client'
import Image from "next/image";
import { useState } from "react";

const TweetAvatar = ({ username, src }: { username: string; src: string }) => {
    const [error, setError] = useState(false);

    return error || !src ? (
        <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white font-bold uppercase text-sm">
            {username?.charAt(0) || "?"}
        </div>
    ) : (
        <Image
            src={src}
            alt="Avatar"
            height={40}
            width={40}
            className="rounded-full"
            onError={() => setError(true)}
        />
    );
};

export default TweetAvatar