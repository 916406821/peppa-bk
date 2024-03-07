interface Props {
  href?: string
  className?: string
}

export default function IconPark({ href, className }: Props) {
  return (
    <svg className={`iconpark-icon ${className}`}>
      <use href={href}></use>
    </svg>
  )
}
