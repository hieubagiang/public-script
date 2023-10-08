# Đường dẫn đến tệp preload_doskey.bat trong UserProfile
$doskeyScriptPath = "$env:USERPROFILE\preload_doskey.bat"

# URL của tệp preload_doskey.bat trên GitHub
$doskeyScriptURL = "https://raw.githubusercontent.com/hieubagiang/public-script/main/preload_doskey.bat"

# Fetch preload_doskey.bat from Remote
Invoke-WebRequest -Uri $doskeyScriptURL -OutFile $doskeyScriptPath

# Thêm tệp preload_doskey.bat vào AutoRun của Command Prompt
$regPath = "HKCU:\Software\Microsoft\Command Processor"
$regName = "AutoRun"
$regValue = "$doskeyScriptPath"

if (-not (Test-Path -Path $regPath)) {
    New-Item -Path $regPath
}

Set-ItemProperty -Path $regPath -Name $regName -Value $regValue

Write-Host "Đã tải và cấu hình tệp preload_doskey.bat thành công."
