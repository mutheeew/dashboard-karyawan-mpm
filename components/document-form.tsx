'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormErrors {
  [key: string]: string;
}

export function DocumentForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    nama: '',
    noDok: '',
    tanggalInput: '',
    file: null as File | null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file,
    }));
    setErrors(prev => ({
      ...prev,
      file: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('noDok', formData.noDok);
      formDataToSend.append('tanggalInput', formData.tanggalInput);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await axios.post(
        '/api/documents/create',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({
          nama: '',
          noDok: '',
          tanggalInput: '',
          file: null,
        });
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        setTimeout(() => {
          onSuccess();
          setSuccessMessage('');
        }, 1000);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ errors: FormErrors; message: string }>;
      if (axiosError.response?.data?.errors) {
        setErrors(axiosError.response.data.errors);
      } else {
        setErrors({ submit: axiosError.response?.data?.message || 'Terjadi kesalahan' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Tambah Dokumen</h2>

      {successMessage && (
        <div className="flex gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-900 dark:text-green-200">
          <CheckCircle size={16} className="mt-0.5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errors.submit && (
        <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-900 dark:text-red-200">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="nama">Nama Dokumen</Label>
        <Input
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          placeholder="Masukkan nama dokumen"
          className={errors.nama ? 'border-red-500' : ''}
        />
        {errors.nama && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.nama}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="noDok">Nomor Dokumen</Label>
        <Input
          id="noDok"
          name="noDok"
          value={formData.noDok}
          onChange={handleInputChange}
          placeholder="Masukkan nomor dokumen"
          className={errors.noDok ? 'border-red-500' : ''}
        />
        {errors.noDok && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.noDok}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tanggalInput">Tanggal Input</Label>
        <Input
          id="tanggalInput"
          name="tanggalInput"
          type="date"
          value={formData.tanggalInput}
          onChange={handleInputChange}
          className={errors.tanggalInput ? 'border-red-500' : ''}
        />
        {errors.tanggalInput && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.tanggalInput}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          className={errors.file ? 'border-red-500' : ''}
        />
        {errors.file && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.file}</p>
        )}
        {formData.file && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            File: {formData.file.name}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Menyimpan...' : 'Simpan'}
      </Button>
    </form>
  );
}
