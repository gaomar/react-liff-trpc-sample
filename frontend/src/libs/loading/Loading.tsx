import * as React from 'react'
import { AppLoading } from './AppLoading'

/** LoadingContext コンテキストオブジェクトの型 */
export interface LoadingContextType {
  open: boolean
  message: string
  /** Loading を表示したいときに呼び出します */
  showLoading: (_open: boolean, _message: string) => void
}

/** ローディングの表示状態を管理するコンテキストオブジェクト */
export const LoadingContext = React.createContext<LoadingContextType>({
  open: false, // デフォルト値
  message: '',
  showLoading: (_open: boolean, _message: string) => {} // ダミー関数
})

/**
 * LoadingContext コンテキストオブジェクトを提供するコンポーネント。
 *
 * このコンポーネント以下に配置した子コンポーネントであれば、
 * useLoading フック関数を呼び出すことができます。
 */
export const LoadingContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const context: LoadingContextType = React.useContext(LoadingContext)
  const [open, setOpen] = React.useState(context.open)
  const [message, setMessage] = React.useState(context.message)

  // コンテクストオブジェクトに自分自身の値を変更する関数をセットする
  const newContext: LoadingContextType = React.useMemo(
    () => ({
      open,
      message,
      showLoading: (open: boolean, message: string) => {
        setOpen(open)
        setMessage(message)
      }
    }),
    [open, setOpen, message, setMessage]
  )

  return (
    <LoadingContext.Provider value={newContext}>
      {children}
      <AppLoading open={newContext.open} message={newContext?.message} />
    </LoadingContext.Provider>
  )
}

/** LoadingContext を簡単に使うためのユーティリティ関数 */
export function useLoading (): LoadingContextType {
  return React.useContext(LoadingContext)
}
