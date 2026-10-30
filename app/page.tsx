import { AnimatedCard } from "./components/AnimatedCard"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーロー：カスタムカラーを使用 */}
      <section className="bg-brand-900 text-white text-center px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          ダッシュボード
        </h2>
        <p className="text-brand-100 text-sm md:text-base max-w-xl mx-auto mb-6">
          タスクを効率的に管理して、チームの生産性を向上させましょう。
        </p>
      </section>

      {/* サービスカード */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          タスク概要
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          

            <AnimatedCard
            title="Web開発"
            description="React・Next.jsを活用した高品質なWebアプリケーション開発"/>
            

            <AnimatedCard 
            title="コンサルティング"
            description="ビジネス課題を分析し、最適なIT戦略をご提案"/>
            
            <AnimatedCard 
            title="インフラ構築"
            description="クラウドサービスを活用したスケーラブルなインフラ構築"/>
        </div>
      </section>
    </div>
  )
}