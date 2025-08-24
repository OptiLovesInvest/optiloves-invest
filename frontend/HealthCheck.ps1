param(
  [string]$FrontApex = "https://optilovesinvest.com",
  [string]$FrontWWW  = "https://www.optilovesinvest.com",
  [string]$Back      = "https://optiloves-backend.onrender.com"
)

$pass = $true

Write-Host "`n--- Apex ($FrontApex) ---" -ForegroundColor Cyan
try {
  $resp = Invoke-WebRequest -Uri $FrontApex -Method Head -ErrorAction Stop
  Write-Host "Status:" $resp.StatusCode
  if ($resp.StatusCode -ne 200) { $pass = $false }
} catch {
  Write-Host "FAILED:" $_.Exception.Message -ForegroundColor Red
  $pass = $false
}

Write-Host "`n--- WWW redirect ($FrontWWW) ---" -ForegroundColor Cyan
$resp = $null
try { $resp = Invoke-WebRequest -Uri $FrontWWW -Method Head -MaximumRedirection 0 -ErrorAction Stop } catch { $resp = $_.Exception.Response }
$code = 0; $headers = $null
try { if ($resp) { $code = [int]$resp.StatusCode; $headers = $resp.Headers } } catch {}
$loc = $null
if ($headers) {
  $loc = $headers['Location']
  if (-not $loc) {
    $ref = $headers['Refresh']
    if ($ref -and $ref -match 'url=(.+)$') { $loc = $Matches[1] }
  }
}
Write-Host "Status:" $code
if ($loc) { Write-Host "Location:" $loc }
if ($code -eq 308 -and $loc -like "$FrontApex*") { } else {
  Write-Host "FAILED: Expected 308 redirect to $FrontApex" -ForegroundColor Red
  $pass = $false
}

Write-Host "`n--- Backend /properties ---" -ForegroundColor Cyan
try {
  $resp = Invoke-WebRequest -Uri "$Back/properties" -ErrorAction Stop
  Write-Host "Status:" $resp.StatusCode
  if ($resp.StatusCode -ne 200) { $pass = $false }
  $json = $resp.Content | ConvertFrom-Json
  $titles = $json | Select-Object -ExpandProperty title
  Write-Host "Properties found:" ($titles -join ", ")
  if ($titles -match "Kinshasa" -and $titles -match "Luanda") {
    Write-Host "✅ Expected properties are present." -ForegroundColor Green
  } else {
    Write-Host "⚠️ Missing expected properties!" -ForegroundColor Yellow
    $pass = $false
  }
} catch {
  Write-Host "FAILED:" $_.Exception.Message -ForegroundColor Red
  $pass = $false
}

Write-Host "`n=== Health check complete ===" -ForegroundColor Green
if ($pass) { Write-Host "OVERALL: ✅ PASS" -ForegroundColor Green; exit 0 }
else       { Write-Host "OVERALL: ❌ FAIL" -ForegroundColor Red;  exit 1 }
