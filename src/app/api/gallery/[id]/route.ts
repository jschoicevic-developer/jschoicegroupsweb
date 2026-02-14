import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, GalleryItem } from '@/types/crm';

/**
 * GET - Fetch individual gallery item
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<GalleryItem>>> {
    try {
        const { id } = await params;
        const supabase = createServerClient();
        const { data, error } = await supabase
            .from('gallery_items')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: data as GalleryItem });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * PUT - Update gallery item
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<GalleryItem>>> {
    try {
        const { id } = await params;
        const body = await request.json();
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('gallery_items')
            .update({
                title: body.title,
                description: body.description,
                images: body.images,
                category: body.category,
                display_order: body.display_order,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: 'Failed to update gallery item' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            data: data as GalleryItem,
            message: 'Gallery item updated successfully'
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * DELETE - Remove gallery item
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
    try {
        const { id } = await params;
        const supabase = createServerClient();
        const { error } = await supabase
            .from('gallery_items')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ success: false, error: 'Failed to delete gallery item' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
