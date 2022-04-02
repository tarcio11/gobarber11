import React from 'react'

import { Container } from './styles'

interface TooltipProps {
  title: string
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  )
}
