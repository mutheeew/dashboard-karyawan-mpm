'use client';

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Download, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Document {
  id: number;
  nama: string;
  noDok: string;
  tanggalInput: string;
  namaFile: string;
  filePath: string;
  createdAt: string;
}

export function DocumentTable({ refreshTrigger }: { refreshTrigger: number }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get('/api/documents/read');
      if (response.data.success) {
        setDocuments(response.data.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Gagal memuat dokumen');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger, fetchDocuments]);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      return;
    }

    try {
      await axios.delete(`/api/documents/${id}`);
      fetchDocuments();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Gagal menghapus dokumen');
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border">
        <div className="p-6 text-center text-sm text-muted-foreground">
          Memuat dokumen...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900">
        <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      {documents.length === 0 ? (
        <div className="p-6 text-center text-sm text-muted-foreground">
          Tidak ada dokumen
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No</TableHead>
              <TableHead>Nama Dokumen</TableHead>
              <TableHead>Nomor Dokumen</TableHead>
              <TableHead>Tanggal Input</TableHead>
              <TableHead>Nama File</TableHead>
              <TableHead className="w-48">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{doc.nama}</TableCell>
                <TableCell>{doc.noDok}</TableCell>
                <TableCell>
                  {new Date(doc.tanggalInput).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>{doc.namaFile}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <a href={doc.filePath} download>
                        <Download size={16} />
                        Download
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(doc.id)}
                      className="gap-1"
                    >
                      <Trash2 size={16} />
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
