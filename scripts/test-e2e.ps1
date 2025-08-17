param(
  [string]$Backend="https://YOUR-RENDER.onrender.com",
  [string]$PropId="kin-001",
  [int]$Qty=1
)
$before = Invoke-RestMethod "$Backend/properties"
$resp = Invoke-RestMethod -Uri "$Backend/buy" -Method POST -ContentType "application/json" -Body (@{property_id=$PropId;wallet="test";quantity=$Qty} | ConvertTo-Json)
Write-Host "Checkout URL:" $resp.url
Start-Process $resp.url
Read-Host "Press Enter after payment completes"
$after = Invoke-RestMethod "$Backend/properties"
$before
$after
