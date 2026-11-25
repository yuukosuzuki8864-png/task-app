// app/opengraph-image.tsx（新しく作る）
import { ImageResponse } from 'next/og'

export const alt = 'TaskApp'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: 'white',
          fontSize: 96,
        }}
      >
        TaskApp
      </div>
    ),
    size,
  )
}