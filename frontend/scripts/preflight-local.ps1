param()

Write-Host "== OptiLoves Local Preflight =="

# 1) Node check (20.x)
$node = (node -v) 2>$null
if (-not $node) { Write-Error "Node not found. Install Node 20.x"; exit 1 }
Write-Host "Node version: $node"

# 2) Required envs
$ok = $true
if (-not $env:NEXT_PUBLIC_BACKEND -or [string]::IsNullOrWhiteSpace($env:NEXT_PUBLIC_BACKEND)) {
  Write-Error "NEXT_PUBLIC_BACKEND is not set. Example: https://optiloves-backend.onrender.com"
  $ok = $false
} else {
  Write-Host "NEXT_PUBLIC_BACKEND: $env:NEXT_PUBLIC_BACKEND"
}
if (-not $env:OPTI_API_KEY -or [string]::IsNullOrWhiteSpace($env:OPTI_API_KEY)) {
  Write-Error "OPTI_API_KEY is not set (server key used by proxy route)."
  $ok = $false
} else {
  Write-Host "OPTI_API_KEY length: $($env:OPTI_API_KEY.Length)"
}

if (-not $ok) { exit 1 }

# 3) Port 3000 availability
$tcp = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($tcp) {
  Write-Warning "Port 3000 in use. Killing owning process: $($tcp.OwningProcess)"
  try { Stop-Process -Id $tcp.OwningProcess -Force } catch {}
}

Write-Host "Preflight OK."
exit 0