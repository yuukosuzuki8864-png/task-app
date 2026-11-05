// app/components/AnalyticsTracker.tsx
'use client';

import React from 'react';

export default function AnalyticsTracker() {
  // 'NEXT_PUBLIC_' が付いた変数を呼び出す
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // ブラウザの開発者ツールのコンソールに表示されます
  console.log('Google Analytics ID:', gaId);

  // もしサーバー専用の変数を呼び出そうとすると...
  const secretKey = process.env.API_SECRET_KEY;
  console.log('Secret Key on Client:', secretKey); // 結果は 'undefined' になります

  return (
    <div>
      <p>Google Analytics ID: {gaId}</p>
    </div>
  );
}