$backend  = "$HOME\Documents\Optiloves_Invest_MVP_with_backend\backend"
$frontend = "$HOME\Documents\Optiloves_Invest_MVP_with_backend\frontend"

# Prefer "py -3" if available; otherwise use "python"
$pythonCmd = "python"; if (Get-Command py -ErrorAction SilentlyContinue) { $pythonCmd = "py -3" }

Start-Process -FilePath "powershell.exe" -WorkingDirectory $backend  -ArgumentList "-NoExit -Command `"$pythonCmd app.py`""
Start-Process -FilePath "powershell.exe" -WorkingDirectory $frontend -ArgumentList "-NoExit -Command `"npm run dev`""
