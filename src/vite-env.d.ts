/**
 * CSS Module 類型聲明
 */

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}
