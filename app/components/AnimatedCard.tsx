import styles from './AnimatedCard.module.css'

type Props = {
  title: string
  description: string
}

export const AnimatedCard = ({ title, description }: Props) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${styles.card}`}>
      <div className={`w-12 h-1 bg-brand-500 mb-4 ${styles.bar}`}></div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}