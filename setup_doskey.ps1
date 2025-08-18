# Final Setup Script by Pham Doan Hieu
Write-Host "=== Tool preload alias by Pham Doan Hieu ==="

# =============================
# 1. Setup alias cho CMD (doskey)
# =============================
$doskeyScriptPath = "$env:USERPROFILE\preload_doskey.bat"
$doskeyScriptURL  = "https://raw.githubusercontent.com/hieubagiang/public-script/main/preload_doskey.bat"

Write-Host "Fetch alias for CMD from remote..."
Invoke-WebRequest -Uri $doskeyScriptURL -OutFile $doskeyScriptPath

$regPath = "HKCU:\Software\Microsoft\Command Processor"
$regName = "AutoRun"
$regValue = "$doskeyScriptPath"

if (-not (Test-Path -Path $regPath)) {
    New-Item -Path $regPath | Out-Null
}
Set-ItemProperty -Path $regPath -Name $regName -Value $regValue
Write-Host "Alias CMD đã được cấu hình."

# =============================
# 2. Setup alias cho PowerShell
# =============================
$psAliasURL  = "https://raw.githubusercontent.com/hieubagiang/public-script/main/preload_alias.ps1"
$psAliasPath = "$env:USERPROFILE\preload_alias.ps1"

Write-Host "Fetch alias for PowerShell from remote..."
Invoke-WebRequest -Uri $psAliasURL -OutFile $psAliasPath

# Bỏ chặn file (tránh cảnh báo khi chạy)
Unblock-File -Path $psAliasPath

# Thêm vào PowerShell profile để auto-load
$psProfilePath = $PROFILE
if (-not (Test-Path -Path $psProfilePath)) {
    New-Item -ItemType File -Path $psProfilePath -Force | Out-Null
}
if (-not (Get-Content $psProfilePath | Select-String "preload_alias.ps1")) {
    Add-Content -Path $psProfilePath -Value "`n. `"$psAliasPath`""
    Write-Host "Alias PowerShell đã được thêm vào profile."
} else {
    Write-Host "Alias PowerShell đã tồn tại trong profile."
}

Write-Host "=== Cấu hình alias thành công cho cả CMD và PowerShell ==="
