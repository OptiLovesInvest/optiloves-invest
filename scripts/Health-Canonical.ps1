Write-Host "== PROD =="
try {
  $gp = Invoke-WebRequest "https://optilovesinvest.com/api/checkout?t=$(Get-Random)" -ErrorAction Stop
  $j = $gp.Content | ConvertFrom-Json
  "ok: $($j.ok) | backend: $($j.backend) | rateLimit: $($j.rateLimit.windowMs)ms/$($j.rateLimit.max)"
} catch {
  "prod checkout failed: $($_.Exception.Message)"
}

Write-Host "`n== LOCAL =="
try {
  $hl = Invoke-WebRequest "http://127.0.0.1:3000/api/health?t=$(Get-Random)" -ErrorAction Stop
  $jl = $hl.Content | ConvertFrom-Json
  "ok: $($jl.ok) | backend: $($jl.backend) | rateLimit: $($jl.rateLimit.windowMs)ms/$($jl.rateLimit.max)"
} catch {
  # fallback to local checkout
  $gl = Invoke-WebRequest "http://127.0.0.1:3000/api/checkout?t=$(Get-Random)"
  $jl = $gl.Content | ConvertFrom-Json
  "ok: $($jl.ok) | backend: $($jl.backend) | rateLimit: $($jl.rateLimit.windowMs)ms/$($jl.rateLimit.max)"
}