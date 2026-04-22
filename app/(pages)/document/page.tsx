'use client';

import { useState } from 'react';
import { DocumentForm } from '@/components/document-form';
import { DocumentTable } from '@/components/document-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Page() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Document Data</h1>
        <Button onClick={() => setShowForm(true)}>
          + Tambah Data
        </Button>
      </div>

      <DocumentTable refreshTrigger={refreshTrigger} />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Dokumen Baru</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan dokumen karyawan baru
            </DialogDescription>
          </DialogHeader>
          <div className="pr-6">
            <DocumentForm onSuccess={handleFormSuccess} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
