Write-Host "GET /api/health"
$h = Invoke-WebRequest "https://optilovesinvest.com/api/health?t=$(Get-Random)"
$h.Content
Write-Host "-----`nGET /api/checkout"
$g = Invoke-WebRequest "https://optilovesinvest.com/api/checkout?t=$(Get-Random)"
$g.Content
Write-Host "-----`nPOST /api/checkout"
$body = @{ property_id='kin-nsele'; quantity=1; owner='69CJqijdBsRg6FdcXZxrtPnjJwsYy1mRcWPpATLxXF6B' } | ConvertTo-Json -Compress
$r = Invoke-WebRequest 'https://optilovesinvest.com/api/checkout' -Method Post -ContentType 'application/json' -Body $body
[int]$r.StatusCode
$r.Content