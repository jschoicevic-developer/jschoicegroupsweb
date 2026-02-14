
import { redirect } from 'next/navigation';

interface LeadDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
    const { id } = await params;

    // Redirect to the main leads page with the id as a query param
    // This will trigger the auto-open logic we added to the LeadsPage
    redirect(`/admin/login`);
}
