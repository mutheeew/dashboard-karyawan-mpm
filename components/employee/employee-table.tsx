"use client"

import { useState, useMemo } from "react"
import { Eye, X, ArrowUpDown, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { EmployeeRecord } from "@/lib/types/data-karyawan"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { EmployeePreviewModal } from "./employee-preview-modal"

interface EmployeeTableProps {
  data: EmployeeRecord[]
}

const ITEMS_PER_PAGE = 10

export function EmployeeTable({ data }: EmployeeTableProps) {
  const [searchName, setSearchName] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const departments = useMemo(() => {
    const depts = new Set(data.map((emp) => emp.job.department))
    return Array.from(depts).sort()
  }, [data])

  const filteredAndSortedData = useMemo(() => {
    const uniqueEmployees: typeof data = []
    const seenIds = new Set<string>()

    for (const emp of data) {
      if (!seenIds.has(emp.employee.employeeId)) {
        seenIds.add(emp.employee.employeeId)
        uniqueEmployees.push(emp)
      }
    }

    let result = uniqueEmployees

    if (searchName.trim()) {
      result = result.filter((emp) =>
        emp.employee.fullName.toLowerCase().includes(searchName.toLowerCase())
      )
    }

    if (selectedDepartment !== "all") {
      result = result.filter((emp) => emp.job.department === selectedDepartment)
    }

    result.sort((a, b) => {
      const nameA = a.employee.fullName.toLowerCase()
      const nameB = b.employee.fullName.toLowerCase()
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    })

    return result
  }, [data, searchName, selectedDepartment, sortOrder])

  const totalItems = filteredAndSortedData.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages))

  const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE

  const paginatedData = filteredAndSortedData.slice(startIdx, endIdx)

  const infoStartItem = totalItems === 0 ? 0 : startIdx + 1
  const infoEndItem = Math.min(endIdx, totalItems)

  const handleSearch = (value: string) => {
    setSearchName(value)
    setCurrentPage(1)
  }

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev - 1
      return newPage >= 1 ? newPage : 1
    })
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev + 1
      return newPage <= totalPages ? newPage : totalPages
    })
  }

  const handleClearFilters = () => {
    setSearchName("")
    setSelectedDepartment("all")
    setSortOrder("asc")
    setCurrentPage(1)
  }

  const hasActiveFilters = searchName.trim() !== "" || selectedDepartment !== "all"

  const calculateLamaJoin = (joinDate: string) => {
    const join = new Date(joinDate)
    const today = new Date()
    const years = today.getFullYear() - join.getFullYear()
    const months = today.getMonth() - join.getMonth()

    if (months < 0) {
      return `${years - 1} tahun ${12 + months} bulan`
    }
    return `${years} tahun ${months} bulan`
  }

  const handlePreview = (employee: EmployeeRecord) => {
    setSelectedEmployee(employee)
    setIsPreviewOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-48">
              <label className="text-sm font-medium text-gray-700 block mb-2">Nama</label>
              <Input
                placeholder="Ketikkan nama untuk mencari..."
                value={searchName}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="w-48">
              <label className="text-sm font-medium text-gray-700 block mb-2">Department</label>
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-muted-foreground">Semua Department</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {searchName.trim() && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    Nama: "<strong>{searchName}</strong>"
                  </span>
                )}
                {selectedDepartment !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    Department: <strong>{selectedDepartment}</strong>
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 whitespace-nowrap"
              >
                <X className="h-4 w-4 mr-1" />
                Hapus Filter
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="font-semibold">Employee ID</TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortChange(sortOrder === "asc" ? "desc" : "asc")}
                    className="h-auto p-0 hover:bg-transparent font-semibold flex items-center gap-1"
                    title={`Sort by name (${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                  >
                    Nama
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Gender</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Lama Join</TableHead>
                <TableHead className="text-center font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((employee) => (
                  <TableRow
                    key={employee.employee.employeeId}
                    style={{
                      backgroundColor: employee.employee.gender === "female" ? "#fdf2f8" : "#eff6ff",
                    }}
                    className="transition-colors duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = employee.employee.gender === "female" ? "#fbecf8" : "#dbeafe"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = employee.employee.gender === "female" ? "#fdf2f8" : "#eff6ff"
                    }}
                  >
                    <TableCell className="font-medium">
                      {employee.employee.employeeId}
                    </TableCell>
                    <TableCell className="font-medium">{employee.employee.fullName}</TableCell>
                    <TableCell>
                        {employee.employee.gender}
                    </TableCell>
                    <TableCell>{employee.job.department}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex px-2 py-1 rounded-md",
                          employee.job.employmentStatus === "permanent"
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                        )}
                      >
                        {employee.job.employmentStatus}
                      </span>
                    </TableCell>
                    <TableCell>{calculateLamaJoin(employee.job.joinDate)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(employee)}
                        className="hover:bg-gray-200"
                        title={`Preview ${employee.employee.fullName}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    <div className="space-y-2">
                      <p>Tidak ada data karyawan</p>
                      {hasActiveFilters && (
                        <p className="text-sm text-gray-400">
                          Coba ubah filter pencarian Anda
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            {totalItems > 0 ? (
              <>
                Showing <span className="font-semibold">{infoStartItem}</span> to{" "}
                <span className="font-semibold">{infoEndItem}</span> of{" "}
                <span className="font-semibold">{totalItems}</span> data
                {hasActiveFilters && (
                  <span className="text-gray-500 ml-2">(from total {data.length} entries)</span>
                )}
                {/* <span className="text-gray-500 ml-2">({paginatedData.length} ditampilkan)</span> */}
              </>
            ) : (
              <span>Tidak ada data</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Page <span className="font-semibold">{safeCurrentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={safeCurrentPage >= totalPages || totalItems === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <EmployeePreviewModal
        employee={selectedEmployee}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </>
  )
}