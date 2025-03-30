interface PlaceholderImageProps {
  width?: number
  height?: number
  className?: string
}

export function PlaceholderImage({ width = 400, height = 300, className }: PlaceholderImageProps) {
  return (
    <div
      className={`relative bg-muted flex items-center justify-center overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <svg
        width={width / 3}
        height={height / 3}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground/50"
      >
        <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10" />
        <path d="m21 14-3-3-6 6-3-3-4 4" />
        <circle cx="17.5" cy="6.5" r="2.5" />
      </svg>
    </div>
  )
}

