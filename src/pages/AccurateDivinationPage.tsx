import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Typography } from '@jennychen/sideproject-ds'
import { incrementGlobalCount } from '@/lib/supabase'
import { generateDivinationResult } from '@/utils/divination'
import { storageUtils } from '@/utils/storage'
import { useCooldown } from '@/hooks/useCooldown'
import type { AccurateDivinationData, DivinationResult } from '@/types/divination'
import styles from './AccurateDivinationPage.module.css'

const resultConfig: Record<DivinationResult, { title: string }> = {
  good:   { title: '恭喜獲得好運！' },
  bad:    { title: '獲得壞運！' },
  normal: { title: '運氣普普通通！' },
}

export default function AccurateDivinationPage() {
  const navigate = useNavigate()

  const [saved, setSaved] = useState<AccurateDivinationData | null>(
    () => storageUtils.getAccurateDivination()
  )

  const cooldownEndTime = saved?.cooldownEnd ?? null
  const { formattedTime, isExpired } = useCooldown(cooldownEndTime)
  const isOnCooldown = !!cooldownEndTime && !isExpired

  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('')
  const [ageError, setAgeError] = useState('')

  const handleSubmit = () => {
    const ageNum = parseInt(age, 10)
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setAgeError('請輸入有效的年齡（1–120）')
      return
    }
    if (!gender) return

    const result = generateDivinationResult()
    const data: AccurateDivinationData = {
      userInfo: { age: ageNum, gender },
      result: { type: result, message: '', timestamp: Date.now() },
      cooldownEnd: Date.now() + 12 * 60 * 60 * 1000,
    }
    storageUtils.saveAccurateDivination(data)
    incrementGlobalCount()
    setSaved(data)
  }

  // ── Cooldown / Result screen ────────────────────────────────────
  if (isOnCooldown && saved) {
    const cfg = resultConfig[saved.result.type]
    return (
      <div className={styles.cooldownContent}>
        <Typography variant="h2" weight="bold">{cfg.title}</Typography>
        <div className={styles.cooldownDetails}>
          <Typography variant="body-lg">{formattedTime} 後再輸入個人資料占卜</Typography>
          <Typography variant="body-sm" color="secondary">您可以先做一般的運氣占卜</Typography>
        </div>
        <div className={styles.actionArea}>
          <Button label="一般的占卜" variant="primary" size="lg" fullWidth onClick={() => navigate('/normal')} />
          <Button label="回到首頁" variant="secondary" size="lg" fullWidth onClick={() => navigate('/')} />
        </div>
      </div>
    )
  }

  // ── Form screen ─────────────────────────────────────────────────
  return (
    <div className={styles.formContent}>
      <div className={styles.titleSection}>
        <Typography variant="h2" weight="bold">輸入資料</Typography>
        <Typography variant="body" color="secondary">輸入更多資料讓貓蝸算準一點</Typography>
      </div>

      <div className={styles.formCard}>
        <Input
          label="年齡"
          required
          type="number"
          placeholder="請輸入年齡"
          value={age}
          error={!!ageError}
          errorMessage={ageError}
          onChange={(val: string) => { setAge(val); setAgeError('') }}
        />

        <div className={styles.radioGroup}>
          <Typography variant="body-sm" weight="medium">
            性別 <span className={styles.required}>*</span>
          </Typography>
          {(['male', 'female', 'other'] as const).map((g) => (
            <label key={g} className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={() => setGender(g)}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom} />
              <span>{g === 'male' ? '男性' : g === 'female' ? '女性' : '不便透露'}</span>
            </label>
          ))}
        </div>
      </div>

      <Typography variant="caption" color="secondary" className={styles.disclaimer}>
        ＊ 貓蝸知道了你是誰，所以12小時內不能再重複占卜，可以用過路的方式問運氣喔
      </Typography>

      <div className={styles.actionArea}>
        <Button
          label="開始占卜"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!age || !gender}
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}
