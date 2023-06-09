export default function Cell({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex min-h-16 w-screen min-w-full max-w-112 flex-col justify-center md:w-96 md:min-w-96 md:max-w-96 ${className}`}
    >
      {children}
    </div>
  );
}
