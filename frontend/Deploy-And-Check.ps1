# Deploy to Vercel prod, then run HealthCheck.ps1
Set-Location 'C:\Users\ruben\Documents\Optiloves_Invest_MVP_with_backend\frontend'
npx vercel --prod
if ($LASTEXITCODE -ne 0) { Write-Error 'Deploy failed'; exit 1 }
powershell -NoProfile -ExecutionPolicy Bypass -File 'C:\Users\ruben\Documents\Optiloves_Invest_MVP_with_backend\frontend\HealthCheck.ps1'
exit $LASTEXITCODE
