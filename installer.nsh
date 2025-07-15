!macro customInit
  ; Require admin privileges
  UserInfo::GetAccountType
  Pop $0
  ${If} $0 != "admin"
    MessageBox MB_OK "⚠️ You must run this installer as Administrator."
    Quit
  ${EndIf}
!macroend

!macro customInstall
  ; Create config folder only
  SetOutPath "$INSTDIR\\config"
!macroend

!macro customUnInstall
  ; Cleanup config folder
  RMDir /r "$INSTDIR\\config"
!macroend

