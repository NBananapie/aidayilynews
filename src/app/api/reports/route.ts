import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Navigate up from the next.js app folder to the parent project folder -> reports directory
        // Assuming aidayilynews is inside ai_daily_newsletter
        const reportsDir = path.join(process.cwd(), '..', 'reports');

        if (!fs.existsSync(reportsDir)) {
            return NextResponse.json({ error: 'Reports directory not found', path: reportsDir }, { status: 404 });
        }

        const files = fs.readdirSync(reportsDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        // Sort by newest first (assuming naming format newsletter_YYYYMMDD.md)
        markdownFiles.sort((a, b) => b.localeCompare(a));

        const reportsData = markdownFiles.map(filename => {
            const filePath = path.join(reportsDir, filename);
            const content = fs.readFileSync(filePath, 'utf-8');

            // Extract basic info for the list API
            const stats = fs.statSync(filePath);

            return {
                id: filename,
                title: filename.replace('.md', ''),
                content: content,
                date: stats.mtime.toISOString(),
            };
        });

        return NextResponse.json({ success: true, reports: reportsData });

    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch reports', details: error.message }, { status: 500 });
    }
}
