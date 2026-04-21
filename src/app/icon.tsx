import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#ABB3F1',
              lineHeight: 1,
              letterSpacing: '-2px',
            }}
          >
            JSC
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '4px',
              marginTop: 4,
            }}
          >
            NDIS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
