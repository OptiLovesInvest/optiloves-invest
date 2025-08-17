param([string]$Backend="https://YOUR-RENDER.onrender.com",[string]$Log="$env:TEMP\optiloves-health.log")
try {
  $r=Invoke-RestMethod "$Backend/health" -TimeoutSec 10
  "$((Get-Date).ToString('s')) OK $($r.ok)" | Out-File -Append $Log -Encoding utf8
} catch {
  "$((Get-Date).ToString('s')) FAIL $_" | Out-File -Append $Log -Encoding utf8
  Start-Process "$Backend/health"
}
