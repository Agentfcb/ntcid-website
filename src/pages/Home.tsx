import React from 'react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import AdvantageCard from '../components/AdvantageCard'
import { Service, Advantage, Stat } from '../types'

// Импортируем все нужные иконки
import inspectionIcon from '../assets/icons/inspection.png'
import expertiseIcon from '../assets/icons/expertise.png'
import constructionIcon from '../assets/icons/construction.png'
import qualityIcon from '../assets/icons/quality.png'
import speedIcon from '../assets/icons/speed.png'
import licenseIcon from '../assets/icons/license.png'
import experienceIcon from '../assets/icons/experience.png'

const Home: React.FC = () => {
  const services: Service[] = [
    {
      icon: inspectionIcon,
      title: 'Неразрушающий контроль',
      description: 'Проверка надежности материалов, конструкций и сварных швов без их повреждения. Современные методы диагностики.'
    },
    {
      icon: expertiseIcon,
      title: 'Экспертиза',
      description: 'Техническое диагностирование оборудования, инженерных систем и зданий. Профессиональная оценка состояния.'
    },
    {
      icon: constructionIcon,
      title: 'Строительство и коммуникации',
      description: 'Проведение профильных инженерных изысканий и строительный контроль. Полный комплекс услуг.'
    }
  ]

  const advantages: Advantage[] = [
    {
      icon: qualityIcon,
      title: 'Высокое качество',
      description: 'Современное оборудование и квалифицированные специалисты'
    },
    {
      icon: speedIcon,
      title: 'Оперативность',
      description: 'Быстрое выполнение работ в установленные сроки'
    },
    {
      icon: licenseIcon,
      title: 'Лицензии',
      description: 'Все необходимые сертификаты и допуски СРО'
    },
    {
      icon: experienceIcon,
      title: 'Опыт',
      description: 'Многолетний опыт работы в сфере неразрушающего контроля'
    }
  ]

  const stats: Stat[] = [
    { number: '10+', label: 'Лет опыта' },
    { number: '500+', label: 'Проектов' },
    { number: '50+', label: 'Специалистов' },
    { number: '100%', label: 'Гарантия качества' }
  ]

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>НТЦ «НКИД»</h1>
          <p>
            Научно-технический центр «Неразрушающий контроль и диагностика» во Владимире. 
            Технические испытания, анализ, исследования и экспертиза.
          </p>
          <div>
            <Link to="/contact" className="btn">Связаться с нами</Link>
            <Link to="/services" className="btn btn-secondary">Наши услуги</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Наши услуги</h2>
          <p className="section-subtitle">
            Компания работает по следующим основным направлениям
          </p>
          <div className="services-grid">
            {services.map((service: Service, index: number) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn">Все услуги</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#1e293b' }}>
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          <p className="section-subtitle">
            Преимущества работы с НТЦ «НКИД»
          </p>
          <div className="advantages-grid">
            {advantages.map((advantage: Advantage, index: number) => (
              <AdvantageCard key={index} {...advantage} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>О компании</h2>
              <p>
                ООО НТЦ «НКИД» (Научно-технический центр «Неразрушающий контроль и диагностика») 
                во Владимире специализируется на технических испытаниях, анализе, исследованиях и экспертизе.
              </p>
              <p>
                Мы предоставляем полный комплекс услуг по неразрушающему контролю, 
                технической диагностике и инженерным изысканиям.
              </p>
              <Link to="/about" className="btn">Подробнее о нас</Link>
            </div>
            <div className="about-stats">
              {stats.map((stat: Stat, index: number) => (
                <div className="stat-card" key={index}>
                  <span className="stat-number">{stat.number}</span>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA СЕКЦИЯ */}
      <section className="section" style={{ background: '#1e293b' }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '16px'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
              Готовы начать сотрудничество?
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#e2e8f0', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Оставьте заявку прямо сейчас и получите бесплатную консультацию наших специалистов
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn" style={{ background: 'white', color: '#3b82f6' }}>
                Оставить заявку
              </Link>
              <a href="tel:+79107757250" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                Позвонить нам
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
