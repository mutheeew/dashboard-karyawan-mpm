export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface EmployeeDetails {
  employeeId: string;
  nik: string;
  fullName: string;
  gender: 'male' | 'female';
  birthPlace: string;
  birthDate: string; 
  religion: string;
  maritalStatus: 'single' | 'married';
  numberOfChildren: number;
  email: string;
  phoneNumber: string;
  address: Address;
  profilePhotoUrl: string;
}

export interface Job {
  department: string;
  position: string;
  level: 'junior' | 'mid' | 'senior';
  employmentStatus: 'permanent' | 'contract';
  joinDate: string; 
  resignDate: string | null;
  directSupervisor: string;
  workLocation: string;
  shift: string;
  isActive: boolean;
}

export interface Allowances {
  position: number;
  transport: number;
  meal: number;
}

export interface Deductions {
  bpjs: number;
  tax: number;
}

export interface Payroll {
  baseSalary: number;
  allowances: Allowances;
  bonus: number;
  deductions: Deductions;
  netSalary: number;
}

export interface Bank {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface Legal {
  npwp: string;
  bpjsHealth: string;
  bpjsEmployment: string;
  contractStatus: 'permanent' | 'contract';
  contractEndDate: string | null;
}

export interface Performance {
  performanceScore: number;
  performanceGrade: string;
  lastReviewDate: string; 
  kpiTarget: number;
  kpiAchievement: number;
}

export interface EmployeeRecord {
  employee: EmployeeDetails;
  job: Job;
  payroll: Payroll;
  bank: Bank;
  legal: Legal;
  performance: Performance;
}

export interface EmployeeApiResponse {
  status: string;
  data: EmployeeRecord[];
}