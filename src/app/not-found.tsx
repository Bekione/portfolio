import type { Metadata } from "next";
import { NotFoundView } from "./NotFoundView";

export const metadata: Metadata = {
  title: "404: Page Not Found — Bereket Kinfe",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return <NotFoundView />;
}
