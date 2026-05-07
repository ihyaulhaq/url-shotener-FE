import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | LinkConnect",
  description: "Sign up for a free LinkConnect account and start shortening your links today.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
