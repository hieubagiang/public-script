# setup_doskey.ps1
# This script sets up doskey aliases for CMD and PowerShell

# Path to store aliases
$aliasFile = "$env:USERPROFILE\alias.cmd"

# Create alias file if not exists
if (!(Test-Path $aliasFile)) {
    @"
doskey gs=git status
doskey ga=git add $*
doskey gc=git commit -m $*
doskey gp=git push
doskey gl=git log --oneline --graph --decorate --all
"@ | Out-File -Encoding ASCII $aliasFile
}

# Add AutoRun to registry for CMD
$regPath = "HKCU:\Software\Microsoft\Command Processor"
if (-not (Get-ItemProperty -Path $regPath -Name "AutoRun" -ErrorAction SilentlyContinue)) {
    New-ItemProperty -Path $regPath -Name "AutoRun" -Value "doskey /macrofile=$aliasFile" -PropertyType String | Out-Null
} else {
    Set-ItemProperty -Path $regPath -Name "AutoRun" -Value "doskey /macrofile=$aliasFile"
}

# Add alias for PowerShell
$profileDir = Split-Path -Parent $profile
if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

if (!(Test-Path $profile)) {
    New-Item -ItemType File -Path $profile -Force | Out-Null
}

$aliasLine = 'Set-Alias gs git; function ga { git add $args }; function gc { git commit -m $args }; Set-Alias gp git; function gl { git log --oneline --graph --decorate --all }'

$content = Get-Content $profile -ErrorAction SilentlyContinue
if ($content -notcontains $aliasLine) {
    Add-Content $profile $aliasLine
} else {
    Write-Host "PowerShell alias already exists."
}

Write-Host "=== Setup alias successfully for CMD and PowerShell ==="
