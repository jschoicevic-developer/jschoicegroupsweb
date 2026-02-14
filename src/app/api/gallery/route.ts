import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, GalleryItem } from '@/types/crm';

/**
 * GET - List gallery items
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<GalleryItem[]>>> {
    try {
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('gallery_items')
            .select('*')
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error fetching gallery items:', error);
            return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: data as GalleryItem[] });
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST - Create new gallery item
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<GalleryItem>>> {
    try {
        const body = await request.json();
        const supabase = createServerClient();

        if (!body.images || !Array.isArray(body.images) || body.images.length === 0 || !body.title) {
            return NextResponse.json({ success: false, error: 'Title and at least one image are required' }, { status: 400 });
        }

        const galleryData = {
            title: body.title,
            description: body.description || null,
            images: body.images,
            category: body.category || null,
            display_order: body.display_order || 0,
        };

        const { data, error } = await supabase
            .from('gallery_items')
            .insert(galleryData)
            .select()
            .single();

        if (error) {
            console.error('Database error creating gallery item:', error);
            return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            data: data as GalleryItem,
            message: 'Gallery item created successfully'
        });
    } catch (error) {
        console.error('Error creating gallery item:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
