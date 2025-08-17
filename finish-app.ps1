param(
  [string]$Root = "$HOME\Documents\Optiloves_Invest_MVP_with_backend",
  [string]$BackendUrl = "http://127.0.0.1:5000" # set to your Render URL for prod
)

$ErrorActionPreference = "SilentlyContinue"

$frontend = Join-Path $Root "frontend"
$backend  = Join-Path $Root "backend"

# 0) Clean busy ports/processes
Get-Process node -ErrorAction Ignore | Stop-Process -Force
Get-Process python -ErrorAction Ignore | Stop-Process -Force

# 1) Backend venv + deps
if (!(Test-Path "$backend\venv\Scripts\Activate.ps1")) { py -3.13 -m venv "$backend\venv" | Out-Null }
& "$backend\venv\Scripts\python.exe" -m pip install --upgrade pip setuptools wheel > $null
& "$backend\venv\Scripts\pip.exe" install -q flask flask-cors flask-limiter requests stripe python-dotenv > $null

# 2) Start backend
Start-Process powershell -ArgumentList "-NoExit","-Command","`"$backend\venv\Scripts\python.exe`" `"$backend\app.py`"" | Out-Null
Start-Sleep -Seconds 2

# 3) Frontend env -> backend URL
"NEXT_PUBLIC_BACKEND_URL=$BackendUrl" | Set-Content -Encoding utf8 "$frontend\.env.local"

# 4) Frontend deps + build
Push-Location $frontend
if (!(Test-Path ".next")) {
  if (!(Test-Path "node_modules")) { npm install }
  npm run build
}

# 5) Deploy frontend (Vercel)
npx vercel --prod

# 6) Open app locally and /account
Start-Process "http://localhost:3000"
Start-Process "http://localhost:3000/account"
Pop-Location

Write-Host "`nDone. If using Render, set -BackendUrl https://YOUR-BACKEND.onrender.com and rerun." -ForegroundColor Green
