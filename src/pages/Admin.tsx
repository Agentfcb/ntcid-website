import React, { useState, useEffect } from 'react'
import { 
  getApplications, 
  updateApplicationStatus, 
  addReply, 
  deleteApplication 
} from '../utils/applications'
import { Application, ApplicationStatus, statusLabels, statusColors } from '../types'

const Admin: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [editingReply, setEditingReply] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  // Пароль для входа в админку (поменяй на свой!)
  const ADMIN_PASSWORD = 'admin123'

  useEffect(() => {
    // Проверяем авторизацию
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

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
  }

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateApplicationStatus(id, status)
    loadApplications()
  }

  const handleReply = (id: string) => {
    const reply = replyText[id] || ''
    if (reply.trim()) {
      addReply(id, reply)
      setReplyText({ ...replyText, [id]: '' })
      setEditingReply(null)
      loadApplications()
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить эту заявку?')) {
      deleteApplication(id)
      loadApplications()
    }
  }

  const getFilteredApplications = () => {
    let filtered = [...applications]
    
    // Фильтр по статусу
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus)
    }

    // Сортировка
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
        <div style={{ 
          background: '#1e293b', 
          padding: '3rem', 
          borderRadius: '16px',
          border: '1px solid #334155',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ color: '#e2e8f0', marginBottom: '2rem', textAlign: 'center' }}>
            🔐 Вход в админ-панель
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
              <div style={{ 
                color: '#ef4444', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {authError}
              </div>
            )}
            <button 
              type="submit" 
              className="btn"
              style={{ width: '100%' }}
            >
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ color: '#e2e8f0', fontSize: '2rem' }}>
            🛠️ Админ-панель заявок
          </h1>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Выйти
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            background: '#1e293b', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Всего заявок</div>
            <div style={{ color: '#e2e8f0', fontSize: '2rem', fontWeight: '700' }}>
              {applications.length}
            </div>
          </div>
          <div style={{ 
            background: '#1e293b', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Новых</div>
            <div style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div style={{ 
            background: '#1e293b', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>В обработке</div>
            <div style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'processing').length}
            </div>
          </div>
          <div style={{ 
            background: '#1e293b', 
            padding: '1.5rem', 
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Завершено</div>
            <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: '700' }}>
              {applications.filter(a => a.status === 'completed').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
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
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#94a3b8'
          }}>
            <p style={{ fontSize: '1.2rem' }}> Заявок пока нет</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredApplications.map((app) => (
              <div 
                key={app.id}
                style={{ 
                  background: '#1e293b', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  border: '1px solid #334155'
                }}
              >
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>
                      {app.name}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                       {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span 
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
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        background: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="pending">Новая</option>
                      <option value="processing">В обработке</option>
                      <option value="completed">Завершена</option>
                      <option value="rejected">Отклонена</option>
                    </select>
                  </div>
                </div>

                {/* Info */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>📱 Телефон</div>
                    <a href={`tel:${app.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {app.phone}
                    </a>
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}> Email</div>
                    <a href={`mailto:${app.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      {app.email}
                    </a>
                  </div>
                  {app.organization && (
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>🏢 Организация</div>
                      <div style={{ color: '#e2e8f0' }}>{app.organization}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>🔧 Услуга</div>
                    <div style={{ color: '#e2e8f0' }}>{getServiceName(app.serviceType)}</div>
                  </div>
                  {app.preferredDate && (
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>📅 Желаемая дата</div>
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
                      💬 Сообщение
                    </div>
                    <div style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                      {app.message}
                    </div>
                  </div>
                )}

                {/* Reply */}
                {app.reply && (
                  <div style={{ 
                    background: '#1e3a5f',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #3b82f6'
                  }}>
                    <div style={{ color: '#3b82f6', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      ✅ Ответ
                    </div>
                    <div style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                      {app.reply}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {editingReply === app.id ? (
                    <>
                      <input
                        type="text"
                        value={replyText[app.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [app.id]: e.target.value })}
                        placeholder="Введите ответ..."
                        style={{
                          flex: 1,
                          padding: '0.5rem 1rem',
                          background: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#e2e8f0',
                          minWidth: '200px'
                        }}
                      />
                      <button 
                        onClick={() => handleReply(app.id)}
                        className="btn"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                        Отправить
                      </button>
                      <button 
                        onClick={() => setEditingReply(null)}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                        Отмена
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setEditingReply(app.id)}
                        className="btn"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      >
                         Ответить
                      </button>
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="btn btn-secondary"
                        style={{ 
                          padding: '0.5rem 1rem', 
                          fontSize: '0.9rem',
                          borderColor: '#ef4444',
                          color: '#ef4444'
                        }}
                      >
                        🗑️ Удалить
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