import clsx from 'clsx'
import { useId } from 'react'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

function Label({ id, children, level }: { id: string; children: React.ReactNode, level: number }) {
  return (
    <label
      htmlFor={id}
      className={`mb-3 block ${level === 0 ? 'text-base' : 'text-sm'} font-medium text-gray-700`}
    >
      {children}
    </label>
  )
}

export function TextField({
  label,
  type = 'text',
  className,
  level,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & { label: string, level: number }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id} level={level}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

export function SelectField({
  label,
  className,
  level,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> & { label: string, level: number }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id} level={level}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}
