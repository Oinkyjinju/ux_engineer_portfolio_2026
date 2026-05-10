import type { Metadata } from "next";
import ArchiveClient from "./archivePortfolio2025";

export const metadata: Metadata = {
  title: "Archive — Jinju Park",
  robots: { index: false, follow: false },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
