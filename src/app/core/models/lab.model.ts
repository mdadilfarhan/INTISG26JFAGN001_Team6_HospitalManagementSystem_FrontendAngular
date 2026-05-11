export interface LabTestResponse {
  id: number;
  patientId: number;
  appointmentId: number;
  testName: string;
  status: string;
  assignedTo: string;
  fee: number;
  createdAt: string;
}
