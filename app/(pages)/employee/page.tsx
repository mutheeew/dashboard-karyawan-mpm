"use client"

import { useEffect, useState } from "react"
import { EmployeeRecord } from "@/lib/types/data-karyawan"
import { getDataKaryawan } from "@/lib/api/data-karyawan"
import { EmployeeTable } from "@/components/employee/employee-table"

export default function Page() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getDataKaryawan()
        setEmployees(response.data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch employees:", err)
        setError("Gagal memuat data karyawan")
        setEmployees([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Employee Data</h1>
        <p className="text-gray-600 mt-1">Kelola data karyawan perusahaan</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      ) : (
        <EmployeeTable data={employees} />
      )}
    </div>
  )
}