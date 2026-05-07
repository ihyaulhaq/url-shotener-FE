import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | LinkConnect",
  description: "Sign in to your LinkConnect account to manage and shorten your links.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
