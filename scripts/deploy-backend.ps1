param(
  [string]$Root="$HOME\Documents\Optiloves_Invest_MVP_with_backend",
  [string]$DeployHookUrl="" # Render Deploy Hook URL (optional)
)
cd $Root\backend
if (Test-Path .\venv\Scripts\Activate.ps1) { .\venv\Scripts\Activate.ps1 }
pip install -q -r requirements.txt
cd $Root
git add .
git commit -m "deploy" --allow-empty
git push
if ($DeployHookUrl) { Invoke-RestMethod -Uri $DeployHookUrl -Method POST | Out-Null }
