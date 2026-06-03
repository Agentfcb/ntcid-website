import React from 'react'
import AdvantageCard from '../components/AdvantageCard'
import { Advantage, Stat, Direction } from '../types'

// Импортируем все нужные иконки
import specialistsIcon from '../assets/icons/specialists.png'
import equipmentIcon from '../assets/icons/equipment.png'
import certificateIcon from '../assets/icons/certificate.png'
import timeIcon from '../assets/icons/time.png'
import guaranteeIcon from '../assets/icons/guarantee.png'
import priceIcon from '../assets/icons/price.png'

const About: React.FC = () => {
  const advantages: Advantage[] = [
    {
      icon: specialistsIcon,
      title: 'Квалифицированные специалисты',
      description: 'Штат аттестованных экспертов и инженеров с многолетним опытом работы'
    },
    {
      icon: equipmentIcon,
      title: 'Современное оборудование',
      description: 'Оснащены новейшими приборами неразрушающего контроля и диагностики'
    },
    {
      icon: certificateIcon,
      title: 'Аккредитация',
      description: 'Все необходимые лицензии, сертификаты и допуски СРО'
    },
    {
      icon: timeIcon,
      title: 'Соблюдение сроков',
      description: 'Четкое выполнение работ в согласованные сроки'
    },
    {
      icon: guaranteeIcon,
      title: 'Гарантия качества',
      description: 'Ответственность за результаты работ и точность измерений'
    },
    {
      icon: priceIcon,
      title: 'Конкурентные цены',
      description: 'Оптимальное соотношение цены и качества услуг'
    }
  ]

  const stats: Stat[] = [
    { number: '2017', label: 'Год основания' },
    { number: '1000+', label: 'Выполненных проектов' },
    { number: '15', label: 'Аттестованных экспертов' },
    { number: '24/7', label: 'Поддержка клиентов' }
  ]

  const directions: Direction[] = [
    {
      title: 'Неразрушающий контроль',
      desc: 'Проверка надежности материалов, конструкций и сварных швов без их повреждения. Ультразвуковой, радиографический, капиллярный, магнитный и другие методы контроля.'
    },
    {
      title: 'Техническая экспертиза',
      desc: 'Диагностирование оборудования, инженерных систем и зданий. Оценка технического состояния, определение остаточного ресурса, обследование строительных конструкций.'
    },
    {
      title: 'Инженерные изыскания',
      desc: 'Проведение профильных инженерных изысканий для строительства. Геодезические, геологические и экологические изыскания.'
    },
    {
      title: 'Строительный контроль',
      desc: 'Технический надзор за качеством строительно-монтажных работ. Контроль соответствия проектной документации и строительных норм.'
    }
  ]

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>О компании</h1>
          <p>ООО НТЦ «НКИД» - ваш надежный партнер в сфере неразрушающего контроля</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Кто мы</h2>
              <p>
                ООО НТЦ «НКИД» (Научно-технический центр «Неразрушающий контроль и диагностика») 
                во Владимире - специализированная организация, предоставляющая полный комплекс 
                услуг в области технического контроля и диагностики.
              </p>
              <p>
                Мы зарегистрированы по адресу: г. Владимир, ул. Песочная, микрорайон Коммунар.
              </p>
              <p>
                Наша компания специализируется на технических испытаниях, анализе, 
                исследованиях и экспертизе различных объектов промышленного и гражданского назначения.
              </p>
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

      <section className="section" style={{ background: '#1e293b' }}>
        <div className="container">
          <h2 className="section-title">Наши преимущества</h2>
          <p className="section-subtitle">
            Почему клиенты выбирают именно нас
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
          <h2 className="section-title">Основные направления деятельности</h2>
          <p className="section-subtitle">
            Мы работаем по следующим направлениям
          </p>
          
          <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            {directions.map((item: Direction, index: number) => (
              <div 
                key={index} 
                style={{ 
                  background: '#1e293b', 
                  padding: '2rem', 
                  borderRadius: '12px',
                  border: '1px solid #334155'
                }}
              >
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About