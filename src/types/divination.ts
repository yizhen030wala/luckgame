/**
 * 占卜相关类型定义
 */

export type DivinationResult = 'good' | 'bad' | 'normal'

export interface NormalDivinationRecord {
  type: DivinationResult
  timestamp: number
}

export interface NormalDivinationData {
  date: string
  results: NormalDivinationRecord[]
  summary: {
    total: number
    good: number
    bad: number
    normal: number
  }
}

export interface UserInfo {
  age: number
  gender: 'male' | 'female' | 'other'
}

export interface AccurateDivinationData {
  userInfo: UserInfo
  result: {
    type: DivinationResult
    message: string
    timestamp: number
  }
  cooldownEnd: number
}

export interface DivinationImagePair {
  left: string
  right: string
}
