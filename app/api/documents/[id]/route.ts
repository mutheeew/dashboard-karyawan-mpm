import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    const document = db.prepare('SELECT filePath FROM documents WHERE id = ?').get(id) as { filePath: string } | undefined;

    if (!document) {
      return NextResponse.json(
        { success: false, message: 'Dokumen tidak ditemukan' },
        { status: 404 }
      );
    }

    if (document.filePath) {
      const filePath = path.join(process.cwd(), 'public', document.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    db.prepare('DELETE FROM documents WHERE id = ?').run(id);

    return NextResponse.json(
      { success: true, message: 'Dokumen berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { success: false, message: 'Error menghapus dokumen' },
      { status: 500 }
    );
  }
}
