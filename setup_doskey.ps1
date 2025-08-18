# Final Setup Script by Pham Doan Hieu
Write-Host "=== Tool preload alias by Pham Doan Hieu ==="

# =============================
# 1. Setup alias for CMD (doskey)
# =============================
$doskeyScriptPath = "$env:USERPROFILE\preload_doskey.bat"
$doskeyScriptURL  = "https://raw.githubusercontent.com/hieubagiang/public-script/main/preload_doskey.bat"

Write-Host "Fetching alias for CMD from remote..."
Invoke-WebRequest -Uri $doskeyScriptURL -OutFile $doskeyScriptPath

$regPath = "HKCU:\Software\Microsoft\Command Processor"
$regName = "AutoRun"
$regValue = "$doskeyScriptPath"

if (-not (Test-Path -Path $regPath)) {
    New-Item -Path $regPath | Out-Null
}
Set-ItemProperty -Path $regPath -Name $regName -Value $regValue
Write-Host "CMD alias has been configured."

# =============================
# 2. Setup alias for PowerShell
# =============================
$psAliasURL  = "https://raw.githubusercontent.com/hieubagiang/public-script/main/preload_alias.ps1"
$psAliasPath = "$env:USERPROFILE\preload_alias.ps1"

Write-Host "Fetching alias for PowerShell from remote..."
Invoke-WebRequest -Uri $psAliasURL -OutFile $psAliasPath

# Unblock file to avoid execution warning
Unblock-File -Path $psAliasPath

# Add alias script into PowerShell profile
$psProfilePath = $PROFILE
if (-not (Test-Path -Path $psProfilePath)) {
    New-Item -ItemType File -Path $psProfilePath -Force | Out-Null
}
if (-not (Get-Content $psProfilePath | Select-String "preload_alias.ps1")) {
    Add-Content -Path $psProfilePath -Value "`n. `"$psAliasPath`""
    Write-Host "PowerShell alias has been added to profile."
} else {
    Write-Host "PowerShell alias already exists in profile."
}

Write-Host "=== Alias setup completed for both CMD and PowerShell ==="
