import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@jennychen/sideproject-ds'
import { incrementGlobalCount } from '@/lib/supabase'
import { generateDivinationResult } from '@/utils/divination'
import { storageUtils } from '@/utils/storage'
import type { NormalDivinationData } from '@/types/divination'
import styles from './NormalDivinationPage.module.css'

export default function NormalDivinationPage() {
  const navigate = useNavigate()
  const [divinationData, setDivinationData] = useState<NormalDivinationData | null>(null)

  useEffect(() => {
    const today = storageUtils.getTodayDate()
    let data = storageUtils.getNormalDivination()

    if (!data || data.date !== today) {
      data = {
        date: today,
        results: [],
        summary: { total: 0, good: 0, bad: 0, normal: 0 },
      }
    }

    setDivinationData(data)
  }, [])

  const handleImageSelect = () => {
    const result = generateDivinationResult()

    if (divinationData) {
      const newData: NormalDivinationData = {
        ...divinationData,
        results: [
          ...divinationData.results,
          { type: result, timestamp: Date.now() },
        ],
        summary: {
          total: divinationData.summary.total + 1,
          good: divinationData.summary.good + (result === 'good' ? 1 : 0),
          bad: divinationData.summary.bad + (result === 'bad' ? 1 : 0),
          normal: divinationData.summary.normal + (result === 'normal' ? 1 : 0),
        },
      }
      setDivinationData(newData)
      storageUtils.saveNormalDivination(newData)
      incrementGlobalCount()
      navigate('/result', { state: { divinationData: newData } })
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.titleSection}>
        <Typography variant="h3" weight="bold">選擇左邊或右邊的圖片</Typography>
        <Typography variant="body" color="secondary">依照直覺隨意選擇吧！</Typography>
      </div>

      <div className={styles.imagePicker}>
        <button className={`${styles.imageOption} ${styles.imageOptionLeft}`} onClick={handleImageSelect} aria-label="選擇左邊">
          <img src="/images/option-left.png" alt="左邊選項" className={styles.optionImg} />
        </button>
        <button className={`${styles.imageOption} ${styles.imageOptionRight}`} onClick={handleImageSelect} aria-label="選擇右邊">
          <img src="/images/option-right.png" alt="右邊選項" className={styles.optionImg} />
        </button>
      </div>
    </div>
  )
}
