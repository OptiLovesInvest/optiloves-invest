param()

$ver = (node -v) -replace "[^0-9\.]"
if (-not ($ver.StartsWith("20") -or $ver.StartsWith("22"))) {
  Write-Error "Require Node 20.x or 22.x (found $ver)"; exit 1
}

$envFile = Join-Path $PSScriptRoot "..\.env.local"
$need = @("NEXT_PUBLIC_BACKEND")
$missing = @()
if (Test-Path $envFile) {
  $lines = Get-Content $envFile
  foreach ($k in $need) { if (-not ($lines | Select-String "^$k=")) { $missing += $k } }
} else { $missing = $need }
if ($missing.Count -gt 0) { Write-Error "Missing env var(s): $($missing -join ', ') in .env.local"; exit 1 }

try {
  $conns = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  if ($conns) { $conns | Select -Expand OwningProcess | Sort-Object -Unique | % { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }
} catch {}