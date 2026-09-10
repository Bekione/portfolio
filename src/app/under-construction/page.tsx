import type { Metadata } from "next";
import { UnderConstructionView } from "./UnderConstructionView";

export const metadata: Metadata = {
  title: "Under Construction — Bereket Kinfe",
  description:
    "I'm currently updating my personal website and portfolio. Please check back shortly.",
};

export default function UnderConstructionPage() {
  return <UnderConstructionView />;
}
