export interface User {
  id?: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  rollNo?: string;
  whatsapp?: string;
  college?: string;
  department?: string;
  year?: number;
  currentSemester: number;
  section?: string;
  isAdmin: boolean;
  createdAt?: string;
}
