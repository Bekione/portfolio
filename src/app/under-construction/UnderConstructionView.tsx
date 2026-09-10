"use client";

import { Mail, ArrowLeft } from "lucide-react";
import { StatusPageLayout } from "../../components/StatusPageLayout";
import { PERSONAL_INFO } from "../../data/portfolioData";

export function UnderConstructionView() {
  return (
    <StatusPageLayout
      headerStatus="Updating Portfolio"
      badge="Site Under Construction"
      title={
        <>
          Currently updating <br />
          <span className="text-vermilion">my portfolio.</span>
        </>
      }
      description="I'm refreshing my website with recent projects, case studies, and engineering write-ups. The site will be back up shortly."
      secondaryText="In the meantime, if you'd like to discuss a project, work together, or just connect, feel free to reach out directly."
      actions={[
        {
          label: "Get in Touch",
          href: `mailto:${PERSONAL_INFO.email}`,
          icon: Mail,
          variant: "primary",
        },
        {
          label: "Back to Home",
          href: "/",
          icon: ArrowLeft,
          variant: "secondary",
        },
      ]}
    />
  );
}
