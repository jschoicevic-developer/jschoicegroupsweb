import type { Metadata } from 'next';
import ToolsGrid from './ToolsGrid';

export const metadata: Metadata = {
  title: 'Free NDIS Tools',
  description: 'Access free NDIS tools including a price guide, budget calculator and service matcher. JS Choice Group helps you navigate your NDIS journey.',
  keywords: ['Free NDIS Tools Melbourne'],
  alternates: { canonical: 'https://jschoicegroup.com.au/tools' },
};

export default function ToolsPage() {
  return (
    <>
      <h1 className="sr-only">NDIS Tools</h1>
      <ToolsGrid />
    </>
  );
}
