"use client";
import React from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { StatusPageLayout } from "../components/StatusPageLayout";
import { PERSONAL_INFO } from "../data/portfolioData";
export function NotFoundView() {
  return (
    <StatusPageLayout
      headerStatus="404 // Page Not Found"
      badge="Error 404 // Route Missing"
      title={
        <>
          This page doesn&apos;t <br />
          <span className="text-vermilion">exist.</span>
        </>
      }
      description="The link you followed might be broken, outdated, or the page may have been moved or removed."
      secondaryText="You can head back to the main workshop to browse recent projects and case studies, or reach out directly if you were looking for something specific."
      actions={[
        {
          label: "Back to Home",
          href: "/",
          icon: ArrowLeft,
          variant: "primary",
        },
        {
          label: "Get in Touch",
          href: `mailto:${PERSONAL_INFO.email}`,
          icon: Mail,
          variant: "secondary",
        },
      ]}
    />
  );
}