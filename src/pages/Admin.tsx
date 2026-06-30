import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  getApplications, 
  updateApplicationStatus, 
} from '../utils/applications'
import { Application, ApplicationStatus, statusLabels, statusColors } from '../types'


const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<Application[]>([])
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const ADMIN_PASSWORD = '123'

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadApplications()
    }
  }, [])

  const loadApplications = () => {
    setApplications(getApplications())
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      loadApplications()
    } else {
      setAuthError('Неверный пароль')
    }
  }

  // Выход → возвращает на главную страницу сайта
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
    navigate('/')
  }

  // Взять в работу
  const handleProcessing = (id: string) => {
    updateApplicationStatus(id, 'processing')
    loadApplications()
  }

  // Завершить заявку (без ответа, просто помечаем что обработали)
  const handleComplete = (id: string) => {
    updateApplicationStatus(id, 'completed')
    loadApplications()
  }

  // Отклонить заявку
  const handleReject = (id: string) => {
    if (window.confirm('Вы уверены что хотите отклонить эту заявку?')) {
      updateApplicationStatus(id, 'rejected')
      loadApplications()
    }
  }

  // Очистить все заявки
  const handleClearAll = () => {
    if (window.confirm('Вы уверены что хотите удалить ВСЕ заявки? Это действие нельзя отменить!')) {
      localStorage.removeItem('ntcid_applications')
      loadApplications()
    }
  }

  const getFilteredApplications = () => {
    let filtered = [...applications]
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus)
    }

    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getServiceName = (type: string) => {
    const services: Record<string, string> = {
      ndt: 'Неразрушающий контроль',
      expertise: 'Экспертиза промышленной безопасности',
      construction: 'Строительство и коммуникации',
      lab: 'Лабораторные исследования',
      diagnostics: 'Техническое обследование',
      consulting: 'Консалтинг и аудит',
      other: 'Другое'
    }
    return services[type] || type
  }

  // Страница входа
  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0f172a', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="admin-login" style={{ 
          background: '#1e293b', 
          padding: '3rem', 
          borderRadius: '16px',
          border: '1px solid #334155',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ color: '#e2e8f0', marginBottom: '2rem', textAlign: 'center' }}>
            Вход в админ-панель
          </h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '1rem'
                }}
                placeholder="Введите пароль"
              />
            </div>
            {authError && (
              <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>
                {authError}
              </div>
            )}
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  const filteredApplications = getFilteredApplications()

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="admin-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{ color: '#e2e8f0', fontSize: '2rem' }}>
            Админ-панель заявок
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleClearAll}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.9rem',
                background: 'transparent',
                border: '1px solid #ef4444',
                color: '#ef4444'
              }}
            >
              Очистить все
            </button>
            <button 
              onClick={handleLogout}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.9rem'
              }}
            >
              Вернуться на сайт
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Всего заявок</div>
            <div className="admin-stats-number" style={{ color: '#e2e8f0', fontSize: '2rem', fontWeight: '700' }}>
              {applications.length}
            </div>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Новых</div>
            <div className="admin-stats-number" style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>В обработке</div>
            <div className="admin-stats-number" style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'processing').length}
            </div>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Завершено</div>
            <div className="admin-stats-number" style={{ color: '#10b981', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'completed').length}
            </div>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Отклонено</div>
            <div className="admin-stats-number" style={{ color: '#ef4444', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters" style={{ 
          background: '#1e293b', 
          padding: '1.5rem', 
          borderRadius: '12px',
          border: '1px solid #334155',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              Фильтр по статусу
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'all')}
              style={{
                padding: '0.5rem 1rem',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            >
              <option value="all">Все статусы</option>
              <option value="pending">Новые</option>
              <option value="processing">В обработке</option>
              <option value="completed">Завершены</option>
              <option value="rejected">Отклонены</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              Сортировка
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'name')}
              style={{
                padding: '0.5rem 1rem',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            >
              <option value="date">По дате</option>
              <option value="name">По имени</option>
              <option value="status">По статусу</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              Порядок
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              style={{
                padding: '0.5rem 1rem',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            >
              <option value="desc">Сначала новые</option>
              <option value="asc">Сначала старые</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <p style={{ fontSize: '1.2rem' }}>Заявок пока нет</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredApplications.map((app) => (
              <div 
                key={app.id}
                className="admin-app-card"
                style={{ 
                  background: '#1e293b', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  border: `1px solid ${app.status === 'rejected' ? '#ef4444' : app.status === 'completed' ? '#10b981' : '#334155'}`,
                  opacity: app.status === 'rejected' ? 0.6 : app.status === 'completed' ? 0.8 : 1
                }}
              >
                {/* Header */}
<div className="admin-app-header" style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'flex-start',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  gap: '1rem'
}}>
  <div>
    <h3 className="admin-app-title" style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>
      {app.name}
    </h3>
    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
      {formatDate(app.createdAt)}
    </p>
  </div>
  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <span 
      className="admin-status-badge"
      style={{ 
        padding: '0.25rem 0.75rem',
        background: statusColors[app.status],
        color: 'white',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '500'
      }}
    >
      {statusLabels[app.status]}
    </span>
  </div>
</div>

                {/* Info */}
                <div className="admin-app-info" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Телефон</div>
                    <a href={`tel:${app.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {app.phone}
                    </a>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Email</div>
                    <a href={`mailto:${app.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {app.email}
                    </a>
                  </div>
                  {app.organization && (
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Организация</div>
                      <div style={{ color: '#e2e8f0' }}>{app.organization}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Услуга</div>
                    <div style={{ color: '#e2e8f0' }}>{getServiceName(app.serviceType)}</div>
                  </div>
                  {app.preferredDate && (
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Желаемая дата</div>
                      <div style={{ color: '#e2e8f0' }}>
                        {new Date(app.preferredDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message */}
                {app.message && (
                  <div style={{ 
                    background: '#0f172a',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Сообщение клиента
                    </div>
                    <div style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                      {app.message}
                    </div>
                  </div>
                )}

{/* Actions */}
<div className="admin-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
  {/* Завершённая заявка */}
  {app.status === 'completed' && (
    <div style={{ 
      color: '#10b981', 
      fontSize: '0.9rem', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 0'
    }}>
      Заявка завершена
    </div>
  )}

  {/* Отклонённая заявка */}
  {app.status === 'rejected' && (
    <div style={{ 
      color: '#ef4444', 
      fontSize: '0.9rem', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 0'
    }}>
      Заявка отклонена
    </div>
  )}

  {/* Новая заявка - только "Взять в работу" */}
  {app.status === 'pending' && (
    <button 
      onClick={() => handleProcessing(app.id)}
      className="btn"
      style={{ 
        padding: '0.5rem 1.5rem', 
        fontSize: '0.9rem',
        background: '#3b82f6',
        borderColor: '#3b82f6'
      }}
    >
      Взять в работу
    </button>
  )}

  {/* В обработке - кнопки "Завершить" и "Отклонить" */}
  {app.status === 'processing' && (
    <>
      <button 
        onClick={() => handleComplete(app.id)}
        className="btn"
        style={{ 
          padding: '0.5rem 1.5rem', 
          fontSize: '0.9rem',
          background: '#10b981',
          borderColor: '#10b981'
        }}
      >
        Завершить заявку
      </button>
      <button 
        onClick={() => handleReject(app.id)}
        className="btn"
        style={{ 
          padding: '0.5rem 1.5rem', 
          fontSize: '0.9rem',
          background: 'transparent',
          border: '1px solid #ef4444',
          color: '#ef4444'
        }}
      >
        Отклонить
      </button>
    </>
  )}
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin