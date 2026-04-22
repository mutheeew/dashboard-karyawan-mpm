import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama = formData.get('nama') as string;
    const noDok = formData.get('noDok') as string;
    const tanggalInput = formData.get('tanggalInput') as string;
    const uploadedFile = formData.get('file') as File | null;

    const errors: { [key: string]: string } = {};

    if (!nama || nama.trim() === '') {
      errors.nama = 'Nama dokumen harus diisi';
    }

    if (!noDok || noDok.trim() === '') {
      errors.noDok = 'Nomor dokumen harus diisi';
    } else {
      const existing = db.prepare('SELECT id FROM documents WHERE noDok = ?').get(noDok);
      if (existing) {
        errors.noDok = 'Nomor dokumen sudah terdaftar';
      }
    }

    if (!tanggalInput || tanggalInput.trim() === '') {
      errors.tanggalInput = 'Tanggal input harus diisi';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(tanggalInput)) {
        errors.tanggalInput = 'Format tanggal harus YYYY-MM-DD';
      }
    }

    if (!uploadedFile) {
      errors.file = 'File harus diunggah';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    if (!uploadedFile) {
      return NextResponse.json(
        { success: false, errors: { file: 'File harus diunggah' } },
        { status: 400 }
      );
    }

    const buffer = await uploadedFile.arrayBuffer();
    const originalFileName = uploadedFile.name;
    const fileExtension = path.extname(originalFileName);
    const fileName = `${Date.now()}_${noDok}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const finalFilePath = path.join(uploadDir, fileName);

    fs.writeFileSync(finalFilePath, Buffer.from(buffer));

    const now = new Date().toISOString();
    const stmt = db.prepare(
      `INSERT INTO documents (nama, noDok, tanggalInput, namaFile, filePath, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    const result = stmt.run(
      nama,
      noDok,
      tanggalInput,
      originalFileName,
      `/uploads/${fileName}`,
      now,
      now
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Dokumen berhasil ditambahkan',
        data: {
          id: result.lastInsertRowid,
          nama,
          noDok,
          tanggalInput,
          namaFile: originalFileName,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { success: false, message: 'Error membuat dokumen' },
      { status: 500 }
    );
  }
}
