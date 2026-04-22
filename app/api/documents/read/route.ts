import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const documents = db.prepare('SELECT * FROM documents ORDER BY createdAt DESC').all();

    return NextResponse.json(
      {
        success: true,
        data: documents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reading documents:', error);
    return NextResponse.json(
      { success: false, message: 'Error membaca dokumen' },
      { status: 500 }
    );
  }
}
