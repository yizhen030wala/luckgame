import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Typography } from '@jennychen/sideproject-ds'
import { storageUtils } from '@/utils/storage'
import type { NormalDivinationData, DivinationResult } from '@/types/divination'
import styles from './ResultPage.module.css'

const resultConfig: Record<DivinationResult, {
  title: string
  getPercentageLabel: (pct: number) => string
  message: string
}> = {
  good: {
    title: '恭喜獲得好運！',
    getPercentageLabel: (pct) => `今天有 ${pct}% 的好運！`,
    message: '可以看看身邊有沒有好事發生~',
  },
  bad: {
    title: '獲得壞運！',
    getPercentageLabel: (pct) => `今天有 ${pct}% 的壞運`,
    message: '凡事小心，並做好萬全準備吧！',
  },
  normal: {
    title: '運氣普普通通！',
    getPercentageLabel: (pct) => `今天有 ${pct}% 是普通運`,
    message: '平凡的一天，穩定地過著就是福氣。',
  },
}

export default function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [divinationData, setDivinationData] = useState<NormalDivinationData | null>(null)

  useEffect(() => {
    const state = location.state as { divinationData?: NormalDivinationData } | null
    const today = storageUtils.getTodayDate()
    const data = state?.divinationData ?? storageUtils.getNormalDivination()

    if (data?.date === today) {
      setDivinationData(data)
    } else {
      navigate('/')
    }
  }, [location.state, navigate])

  if (!divinationData) return null

  const lastResult: DivinationResult = divinationData.results.length > 0
    ? divinationData.results[divinationData.results.length - 1].type
    : 'normal'

  const config = resultConfig[lastResult]

  const dominantCount = divinationData.summary[lastResult]
  const percentage = divinationData.summary.total > 0
    ? Math.round((dominantCount / divinationData.summary.total) * 100)
    : 0

  return (
    <div className={styles.content}>
      <div className={styles.resultSection}>
        <Typography variant="h2" weight="bold">{config.title}</Typography>
        <div className={styles.resultDetails}>
          <Typography variant="body-lg">{divinationData.date} {config.getPercentageLabel(percentage)}</Typography>
          <Typography variant="body-sm" color="secondary">{config.message}</Typography>
        </div>
      </div>

      <div className={styles.historyContainer}>
        <div className={styles.historyList}>
          {[...divinationData.results].reverse().map((item, index) => {
            const time = new Date(item.timestamp).toLocaleTimeString('zh-TW', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })
            const resultText = item.type === 'good' ? '好運' : item.type === 'bad' ? '壞運' : '普通運'

            return (
              <div key={index} className={styles.historyItem}>
                <span className={styles.historyTime}>{time}</span>
                <span className={styles.historyResult}>{resultText}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.actionArea}>
        <Button label="再占卜一次" variant="primary" size="lg" fullWidth onClick={() => navigate('/normal')} />
        <Button label="回到首頁" variant="secondary" size="lg" fullWidth onClick={() => navigate('/')} />
      </div>
    </div>
  )
}
