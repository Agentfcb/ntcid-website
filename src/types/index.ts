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