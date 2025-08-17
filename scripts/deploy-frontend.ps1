param([string]$Frontend="$HOME\Documents\Optiloves_Invest_MVP_with_backend\frontend")
cd $Frontend
if (!(Test-Path ".env.local")) { throw ".env.local missing (NEXT_PUBLIC_BACKEND_URL=...)" }
npm install
npm run build
npx vercel --prod
