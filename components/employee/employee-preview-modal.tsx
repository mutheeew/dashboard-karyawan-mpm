"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EmployeeRecord } from "@/lib/types/data-karyawan"
import PersonalDataJob from "./cards/personal-data"

interface EmployeePreviewModalProps {
  employee: EmployeeRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmployeePreviewModal({
  employee,
  open,
  onOpenChange,
}: EmployeePreviewModalProps) {
  if (!employee) return null

  const { employee: emp, job, legal, bank, performance, payroll } = employee

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Karyawan</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <PersonalDataJob data={emp} job={job} bank={bank} legal={legal} performance={performance} payroll={payroll} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
