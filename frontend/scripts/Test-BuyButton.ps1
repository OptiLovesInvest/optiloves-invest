param([string]$Url = "http://127.0.0.1:3000/property/kin-001")
try {
  $html = (Invoke-WebRequest $Url -Headers @{ "User-Agent"="Mozilla/5.0" }).Content
} catch {
  Write-Host "ERROR: Page not reachable: $Url"; exit 2
}
if ($html -match 'id="buy-static-cta"') { Write-Host "OK: Buy CTA found."; exit 0 }
else { Write-Host "FAIL: Buy CTA NOT found on $Url"; exit 1 }