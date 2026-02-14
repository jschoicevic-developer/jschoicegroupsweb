import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const supabase = createServerClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const BUCKET_NAME = 'gallery';
        const buffer = await file.arrayBuffer();

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase storage error:', error);
            if ((error as any).status === 404 || error.message.includes('not found')) {
                return NextResponse.json({
                    error: `Storage bucket '${BUCKET_NAME}' not found. Please create a public bucket named '${BUCKET_NAME}' in your Supabase dashboard.`
                }, { status: 404 });
            }
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
