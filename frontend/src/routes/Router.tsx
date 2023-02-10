import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from '@/components/Loading'

const Top = lazy(async () => await import('../pages/Top'))
const Error = lazy(async () => await import('../pages/Error'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
