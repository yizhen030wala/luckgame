/**
 * 占卜逻辑工具函数
 */

import type { DivinationResult } from '@/types/divination'

/**
 * 随机生成占卜结果
 */
export const generateDivinationResult = (): DivinationResult => {
  const random = Math.random()
  
  if (random < 0.4) {
    return 'good'
  } else if (random < 0.7) {
    return 'bad'
  } else {
    return 'normal'
  }
}

/**
 * 获取结果对应的中文名称
 */
export const getResultLabel = (result: DivinationResult): string => {
  const labels: Record<DivinationResult, string> = {
    good: '好運',
    bad: '壞運',
    normal: '普通',
  }
  return labels[result]
}

/**
 * 获取结果对应的消息
 */
export const getResultMessage = (result: DivinationResult): string => {
  const messages: Record<DivinationResult, string> = {
    good: '今天運勢極佳，適合嘗試新事物！',
    bad: '要小心行事，保持謹慎會更安全。',
    normal: '平凡的一天，穩定地過著就是福氣。',
  }
  return messages[result]
}

/**
 * 验证年龄输入
 */
export const validateAge = (age: string): { valid: boolean; error?: string } => {
  const ageNum = parseInt(age, 10)
  
  if (isNaN(ageNum)) {
    return { valid: false, error: '請輸入有效的年齡' }
  }
  
  if (ageNum < 1 || ageNum > 120) {
    return { valid: false, error: '年齡需要在 1-120 之間' }
  }
  
  return { valid: true }
}

/**
 * 格式化剩余冷却时间
 */
export const formatCooldownTime = (remainingMs: number): string => {
  const totalSeconds = Math.floor(remainingMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

/**
 * 检查冷却时间是否结束
 */
export const isCooldownExpired = (cooldownEndTime: number): boolean => {
  return Date.now() >= cooldownEndTime
}
