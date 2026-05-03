import Image from "next/image";

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full bg-white absolute z-[40] top-0 flex justify-center items-center p-3">
        <Image
          src="/logos/F1.svg"
          alt="F1 Logo"
          width={100}
          height={100}
        />
      </div>
      {children}
    </>
  );
}
