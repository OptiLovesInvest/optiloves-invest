Write-Host "== PROD =="
$hp = Invoke-WebRequest "https://optilovesinvest.com/api/health?t=$(Get-Random)" -ErrorAction SilentlyContinue
if ($hp) { $hp.Content } else { "no /api/health (ok if not deployed)" }
$gp = Invoke-WebRequest "https://optilovesinvest.com/api/checkout?t=$(Get-Random)"
($gp.Content | ConvertFrom-Json).rateLimit
$bp = @{ property_id='kin-nsele'; quantity=1; owner='69CJqijdBsRg6FdcXZxrtPnjJwsYy1mRcWPpATLxXF6B' } | ConvertTo-Json -Compress
$rp = Invoke-WebRequest 'https://optilovesinvest.com/api/checkout' -Method Post -ContentType 'application/json' -Body $bp
[int]$rp.StatusCode; $rp.Content

Write-Host "`n== LOCAL =="
$gl = Invoke-WebRequest "http://127.0.0.1:3000/api/checkout?t=$(Get-Random)"
($gl.Content | ConvertFrom-Json).rateLimit
$bl = @{ property_id='kin-nsele'; quantity=1; owner='69CJqijdBsRg6FdcXZxrtPnjJwsYy1mRcWPpATLxXF6B' } | ConvertTo-Json -Compress
$rl = Invoke-WebRequest 'http://127.0.0.1:3000/api/checkout' -Method Post -ContentType 'application/json' -Body $bl
[int]$rl.StatusCode; $rl.Content