import { Application, ApplicationStatus } from '../types'

const STORAGE_KEY = 'ntcid_applications'

// Получить все заявки
export const getApplications = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Сохранить все заявки
export const saveApplications = (applications: Application[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
}

// Добавить новую заявку
export const addApplication = (data: Omit<Application, 'id' | 'status' | 'reply' | 'createdAt' | 'updatedAt'>): Application => {
  const applications = getApplications()
  const newApplication: Application = {
    ...data,
    id: Date.now().toString(),
    status: 'pending',
    reply: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  applications.push(newApplication)
  saveApplications(applications)
  return newApplication
}

// Обновить статус заявки
export const updateApplicationStatus = (id: string, status: ApplicationStatus): void => {
  const applications = getApplications()
  const index = applications.findIndex(app => app.id === id)
  if (index !== -1) {
    applications[index].status = status
    applications[index].updatedAt = new Date().toISOString()
    saveApplications(applications)
  }
}

// Добавить ответ на заявку
export const addReply = (id: string, reply: string): void => {
  const applications = getApplications()
  const index = applications.findIndex(app => app.id === id)
  if (index !== -1) {
    applications[index].reply = reply
    applications[index].updatedAt = new Date().toISOString()
    saveApplications(applications)
  }
}

// Удалить заявку
export const deleteApplication = (id: string): void => {
  const applications = getApplications()
  const filtered = applications.filter(app => app.id !== id)
  saveApplications(filtered)
}