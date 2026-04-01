/**
 * Storybook 設計系統類型聲明
 */

declare module '@jennychen/sideproject-ds' {
  import { FC, ReactNode } from 'react'

  // Button
  export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'primaryOutline' | 'danger' | 'dangerOutline'
  export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
  export interface ButtonProps {
    label: string
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit' | 'reset'
  }

  // Input
  export type InputSize = 'sm' | 'md' | 'lg'
  export interface InputProps {
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    defaultValue?: string
    size?: InputSize
    disabled?: boolean
    readOnly?: boolean
    error?: boolean
    errorMessage?: string
    helperText?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    clearable?: boolean
    type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
    maxLength?: number
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
    onClear?: () => void
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onEnterPress?: (value: string) => void
    className?: string
  }

  // Typography
  export type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'overline'
  export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'error' | 'success' | 'link' | 'inverse'
  export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold'
  export interface TypographyProps {
    variant?: TypographyVariant
    color?: TypographyColor
    weight?: TypographyWeight
    as?: string
    truncate?: boolean
    className?: string
    children: ReactNode
  }

  // Card
  export type CardVariant = 'default' | 'elevated' | 'outlined'
  export interface CardProps {
    variant?: CardVariant
    title?: string
    description?: string
    image?: string
    imageAlt?: string
    extra?: ReactNode
    footer?: ReactNode
    onClick?: () => void
    children?: ReactNode
    className?: string
  }

  // Badge
  export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  export type BadgeSize = 'sm' | 'md'
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariant
    size?: BadgeSize
    children?: ReactNode
  }

  // Icon
  export type IconSize = 'sm' | 'md' | 'lg' | 'xl'
  export interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string
    size?: IconSize
  }

  export const Button: FC<ButtonProps>
  export const Input: FC<InputProps>
  export const Typography: FC<TypographyProps>
  export const Card: FC<CardProps>
  export const Badge: FC<BadgeProps>
  export const Icon: FC<IconProps>
}

declare module '@jennychen/sideproject-ds/styles'
