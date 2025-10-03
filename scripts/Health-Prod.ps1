Write-Host 'GET /api/checkout:'
(Invoke-WebRequest 'https://optilovesinvest.com/api/checkout').Content

Write-Host 'POST /api/checkout:'
\{"ok":true,"url":"https://optilovesinvest.com/thank-you"} = Invoke-WebRequest 'https://optilovesinvest.com/api/checkout' -Method Post -ContentType 'application/json' -Body (@{
  property_id='kin-nsele'; quantity=1; owner='69CJqijdBsRg6FdcXZxrtPnjJwsYy1mRcWPpATLxXF6B'
} | ConvertTo-Json -Compress)
[int]\{"ok":true,"url":"https://optilovesinvest.com/thank-you"}.StatusCode
\{"ok":true,"url":"https://optilovesinvest.com/thank-you"}.Content