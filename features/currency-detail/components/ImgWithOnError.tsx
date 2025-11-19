/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function ImgWithOnError({
    src,
    errImg,
    className,
    width,
    height,
    alt,
}: {
    src: string;
    errImg: string;
    className?: string;
    width?: number;
    height?: number;
    alt?: string;
}) {
    return (
        <img
            alt={alt}
            width={width}
            height={height}
            src={src}
            className={className}
            onError={(error) => {
                error.currentTarget.src = errImg;
            }}
        />
    );
}
