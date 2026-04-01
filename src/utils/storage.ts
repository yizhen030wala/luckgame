/**
 * LocalStorage 工具函数
 */

const NORMAL_DIVINATION_KEY = 'normalDivination'
const ACCURATE_DIVINATION_KEY = 'accurateDivination'

export const storageUtils = {
  /**
   * 获取今天的日期字符串 (YYYY-MM-DD)
   */
  getTodayDate: () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  },

  /**
   * 保存一般占卜数据
   */
  saveNormalDivination: (data: any) => {
    try {
      localStorage.setItem(NORMAL_DIVINATION_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save normal divination data:', error)
    }
  },

  /**
   * 获取一般占卜数据
   */
  getNormalDivination: () => {
    try {
      const data = localStorage.getItem(NORMAL_DIVINATION_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get normal divination data:', error)
      return null
    }
  },

  /**
   * 保存准确占卜数据
   */
  saveAccurateDivination: (data: any) => {
    try {
      localStorage.setItem(ACCURATE_DIVINATION_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save accurate divination data:', error)
    }
  },

  /**
   * 获取准确占卜数据
   */
  getAccurateDivination: () => {
    try {
      const data = localStorage.getItem(ACCURATE_DIVINATION_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to get accurate divination data:', error)
      return null
    }
  },

  /**
   * 清除数据
   */
  clearNormalDivination: () => {
    try {
      localStorage.removeItem(NORMAL_DIVINATION_KEY)
    } catch (error) {
      console.error('Failed to clear normal divination data:', error)
    }
  },

  clearAccurateDivination: () => {
    try {
      localStorage.removeItem(ACCURATE_DIVINATION_KEY)
    } catch (error) {
      console.error('Failed to clear accurate divination data:', error)
    }
  },
}
