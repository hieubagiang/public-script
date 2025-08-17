# === Custom Git & Flutter Aliases ===

# Git
function gpf { git push -f @args }
function gp  { git push @args }
function gpo { git push origin @args }
function gc  { git commit -m @args }
function gs  { git status }
function gf  { git fetch }
function ga  { git add . }
function gca { git commit --amend @args }
function grc { git rebase --continue @args }
function grba { git rebase -i --autosquash @args }

# Flutter / Dart / Makefile
function fb  { fvm dart run build_runner build --delete-conflicting-outputs }
function fbw { fvm dart run build_runner watch --delete-conflicting-outputs }
function f   { fvm flutter @args }
function fpg { f pub get }
function fc  { f clean }
function fpa { f pub add @args }
function fg  { make gen }
function ml  { make lang }
