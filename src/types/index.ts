export interface Service {
  icon: string
  title: string
  description: string
}

export interface Advantage {
  icon: string
  title: string
  description: string
}

export interface NavLink {
  path: string
  label: string
}

export interface ContactInfo {
  icon: string
  title: string
  content: string
}

export interface Step {
  step: string
  title: string
  desc: string
}

export interface Direction {
  title: string
  desc: string
}

export interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface ServiceCardProps {
  icon: string
  title: string
  description: string
}

export interface AdvantageCardProps {
  icon: string
  title: string
  description: string
}

export interface Stat {
  number: string
  label: string
}

// ТИПЫ ДЛЯ ЗАЯВОК
export type ApplicationStatus = 'pending' | 'processing' | 'completed' | 'rejected'

export interface Application {
  id: string
  name: string
  phone: string
  email: string
  serviceType: string
  message: string
  preferredDate: string
  organization: string
  status: ApplicationStatus
  reply: string
  createdAt: string
  updatedAt: string
}

export const statusLabels: Record<ApplicationStatus, string> = {
  pending: 'Новая',
  processing: 'В обработке',
  completed: 'Завершена',
  rejected: 'Отклонена'
}

export const statusColors: Record<ApplicationStatus, string> = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  completed: '#10b981',
  rejected: '#ef4444'
}