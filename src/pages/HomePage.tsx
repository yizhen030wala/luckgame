import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@jennychen/sideproject-ds'
import { getGlobalCount } from '@/lib/supabase'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  const [globalCount, setGlobalCount] = useState<number | null>(null)

  useEffect(() => {
    getGlobalCount().then(setGlobalCount)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/*
          Title Frame:
          - 圖片寬 288px → 高 = 288/1080×1920 = 512px
          - 氣泡框在 y:30~226（6%~44% of 512px）
          - 圖片向上偏移 30px，讓氣泡從 frame 頂端開始
          - Frame 高 200px → 顯示 image y:30~230 (氣泡主體)
        */}
        <div className={styles.titleFrame}>
          {/* 底層：氣泡框動畫 */}
          <img src="/gifs/title-bg.gif" alt="" className={styles.titleBgImg} />
          {/* 中層：「今天運氣如何」毛筆字 */}
          <img src="/images/title.png" alt="今天運氣如何" className={styles.titleDecImg} />
          {/* 上層：副標題文字，在氣泡主體內約 y:120-155 (顯示後相對 frame: ~90px) */}
          <p className={styles.titleText}>讓貓蝸來幫你占卜！</p>
        </div>

        {/*
          Cat Frame:
          - 同一圖，貓咪在 y:147~461
          - 圖片向上偏移 147px，讓貓從 frame 頂端開始
          - Frame 高 290px → 顯示 image y:147~437（含頭部到下半身）
        */}
        <div className={styles.catFrame}>
          <img src="/gifs/cat-wakeup.gif" alt="貓蝸" className={styles.catImg} />
        </div>

        {/* Action Area */}
        <div className={styles.actionArea}>
          <Typography variant="caption" color="secondary">
            {globalCount === null ? '載入中...' : `貓蝸已經占卜 ${globalCount} 次`}
          </Typography>
          <div className={styles.actionButtons}>
            <Button label="開始占卜" variant="primary" size="lg" fullWidth onClick={() => navigate('/normal')} />
            <Button label="準確一點的占卜" variant="secondary" size="lg" fullWidth onClick={() => navigate('/accurate')} />
          </div>
        </div>

      </div>
    </div>
  )
}
