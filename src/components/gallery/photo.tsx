"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoProps = {
  file: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  thumbnail?: boolean;
  onLoad?: () => void;
};

export function Photo({
  file,
  alt,
  sizes,
  priority = false,
  thumbnail = false,
  onLoad,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="photo-failure" role="status">
        This photo couldn't load.
        <br />
        Open the original album to view it.
      </span>
    );
  }

  return (
    <Image
      src={`/assets/${file}${thumbnail ? "-thumb" : ""}.webp`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onLoad={onLoad}
      onError={() => {
        setFailed(true);
        onLoad?.();
      }}
    />
  );
}
