import React from 'react'
import ServiceCard from '../components/ServiceCard'
import { Service, Step } from '../types'

// Импортируем все нужные иконки
import inspectionIcon from '../assets/icons/inspection.png'
import safetyIcon from '../assets/icons/safety.png'
import constructionIcon from '../assets/icons/construction.png'
import labIcon from '../assets/icons/lab.png'
import diagnosticsIcon from '../assets/icons/diagnostics.png'
import consultingIcon from '../assets/icons/consulting.png'

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: inspectionIcon,
      title: 'Неразрушающий контроль',
      description: 'Проверка надежности материалов, конструкций и сварных швов без их повреждения. Используем ультразвуковой, радиографический, магнитный и другие методы контроля. Выдаем официальные заключения и протоколы испытаний.'
    },
    {
      icon: safetyIcon,
      title: 'Экспертиза промышленной безопасности',
      description: 'Техническое диагностирование оборудования, инженерных систем и зданий. Проводим экспертизу опасных производственных объектов, обследование строительных конструкций, оценку технического состояния.'
    },
    {
      icon: constructionIcon,
      title: 'Строительство и коммуникации',
      description: 'Проведение профильных инженерных изысканий и строительный контроль. Геодезические работы, обследование грунтов, контроль качества строительно-монтажных работ, технический надзор.'
    },
    {
      icon: labIcon,
      title: 'Лабораторные исследования',
      description: 'Испытания строительных материалов, металлографические исследования, химический анализ, механические испытания. Собственная аккредитованная лаборатория.'
    },
    {
      icon: diagnosticsIcon,
      title: 'Техническое обследование',
      description: 'Комплексное обследование зданий и сооружений, оценка остаточного ресурса оборудования, дефектоскопия, тепловизионный контроль, вибродиагностика.'
    },
    {
      icon: consultingIcon,
      title: 'Консалтинг и аудит',
      description: 'Разработка технической документации, аудит систем качества, подготовка к сертификации, обучение персонала, методическая поддержка.'
    }
  ]

  const steps: Step[] = [
    { step: '01', title: 'Заявка', desc: 'Вы оставляете заявку на сайте или по телефону' },
    { step: '02', title: 'Консультация', desc: 'Обсуждаем задачи и определяем объем работ' },
    { step: '03', title: 'Договор', desc: 'Заключаем договор и согласовываем сроки' },
    { step: '04', title: 'Выполнение', desc: 'Проводим работы с соблюдением всех стандартов' },
    { step: '05', title: 'Отчетность', desc: 'Передаем заключения и протоколы испытаний' }
  ]

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Наши услуги</h1>
          <p>Полный комплекс услуг в области неразрушающего контроля и диагностики</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service: Service, index: number) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#1e293b' }}>
        <div className="container">
          <h2 className="section-title">Как мы работаем</h2>
          <p className="section-subtitle">Этапы выполнения работ</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem', 
            marginTop: '3rem' 
          }}>
            {steps.map((item: Step, index: number) => (
              <div key={index} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '700', 
                  color: '#3b82f6',
                  marginBottom: '1rem'
                }}>{item.step}</div>
                <h3 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services