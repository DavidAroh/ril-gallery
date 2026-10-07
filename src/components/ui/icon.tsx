import type { SVGProps } from "react";

type IconName =
  "folder" | "close" | "previous" | "next" | "expand" | "down" | "up";

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    folder: (
      <path d="M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    previous: <path d="m14 6-6 6 6 6" />,
    next: <path d="m10 6 6 6-6 6" />,
    expand: <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />,
    down: <path d="M12 4v16m-6-6 6 6 6-6" />,
    up: <path d="M12 20V4m-6 6 6-6 6 6" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill={name === "folder" ? "currentColor" : "none"}
      stroke={name === "folder" ? "none" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
