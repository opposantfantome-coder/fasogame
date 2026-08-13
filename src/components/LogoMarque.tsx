import type { SimpleIcon } from "simple-icons";

export default function LogoMarque({
  icon,
  className,
  color,
}: {
  icon: SimpleIcon;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      className={className}
      fill={color ?? "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
