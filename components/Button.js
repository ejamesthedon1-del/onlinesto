import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => {
    if (props.size === 'small') return `${props.theme.spacing.sm} ${props.theme.spacing.md}`
    if (props.size === 'large') return `${props.theme.spacing.md} ${props.theme.spacing.xl}`
    return `${props.theme.spacing.sm} ${props.theme.spacing.lg}`
  }};
  font-size: ${props => {
    if (props.size === 'small') return props.theme.typography.fontSize.sm
    if (props.size === 'large') return props.theme.typography.fontSize.lg
    return props.theme.typography.fontSize.base
  }};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  border: ${props => {
    if (props.variant === 'outline') return `2px solid ${props.theme.colors.primary}`
    return 'none'
  }};
  background-color: ${props => {
    if (props.variant === 'outline') return 'transparent'
    if (props.variant === 'secondary') return props.theme.colors.secondary
    return props.theme.colors.primary
  }};
  color: ${props => {
    if (props.variant === 'outline') return props.theme.colors.primary
    return props.theme.colors.background
  }};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast} ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  min-width: ${props => props.minWidth || 'auto'};

  &:hover:not(:disabled) {
    background-color: ${props => {
      if (props.variant === 'outline') return props.theme.colors.surface
      if (props.variant === 'secondary') return props.theme.colors.textSecondary
      return props.theme.colors.accent
    }};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  minWidth,
  ...props 
}) {
  return (
    <StyledButton 
      variant={variant} 
      size={size}
      fullWidth={fullWidth}
      minWidth={minWidth}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

