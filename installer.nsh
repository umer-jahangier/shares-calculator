!include "MUI2.nsh"

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

; Show license agreement (electron-builder will include license.txt if specified in package.json)
  !insertmacro MUI_PAGE_LICENSE "license.txt"
