/**
 * useCooldown Hook - 管理冷却倒计时
 */

import { useState, useEffect } from 'react'
import { formatCooldownTime, isCooldownExpired } from '@/utils/divination'

export function useCooldown(cooldownEndTime: number | null) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!cooldownEndTime) {
      setRemainingTime(null)
      setIsExpired(false)
      return
    }

    // 初始检查
    if (isCooldownExpired(cooldownEndTime)) {
      setIsExpired(true)
      setRemainingTime(null)
      return
    }

    // 更新倒计时
    const updateCountdown = () => {
      const now = Date.now()
      const remaining = cooldownEndTime - now

      if (remaining <= 0) {
        setIsExpired(true)
        setRemainingTime(null)
      } else {
        setRemainingTime(remaining)
        setIsExpired(false)
      }
    }

    updateCountdown()

    // 每秒更新一次
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [cooldownEndTime])

  return {
    remainingTime,
    formattedTime: remainingTime ? formatCooldownTime(remainingTime) : null,
    isExpired,
  }
}
