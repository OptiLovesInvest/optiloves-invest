Set-Location 'C:\Users\ruben\Documents\Optiloves_Invest_MVP_with_backend\frontend'
npx vercel --prod --confirm --debug *>&1 | Tee-Object (Join-Path 'C:\Users\ruben\Documents\Optiloves_Invest_MVP_with_backend\frontend\_deploy_logs' ('deploy-' + (Get-Date -Format yyyyMMdd-HHmmss) + '.log'))
if ($LASTEXITCODE -ne 0) {
  Write-Error 'Deploy failed'
  exit 1
}
powershell -NoProfile -ExecutionPolicy Bypass -File 'C:\Users\ruben\Documents\Optiloves_Invest_MVP_with_backend\frontend\HealthCheck.ps1'
exit $LASTEXITCODE
