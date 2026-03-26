$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$path = Join-Path $root 'jpg_za_tisk_triplo_2026\05_kisloljubne_rastline.jpg'
$backupDir = Join-Path $root 'backup_before_title_updates_2026-03-26\jpg_za_tisk_triplo_2026'
$backupPath = Join-Path $backupDir '05_kisloljubne_rastline.jpg'

function Get-FontFamilyName {
  foreach ($name in @('Arial Black', 'Arial', 'Segoe UI')) {
    try {
      $font = New-Object System.Drawing.Font($name, 10, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
      $actualName = $font.FontFamily.Name
      $font.Dispose()
      if ($actualName) {
        return $actualName
      }
    } catch {
    }
  }

  throw 'No usable font family found.'
}

function Save-Jpeg {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $encoder = [System.Drawing.Imaging.Encoder]::Quality
  $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 96L)
  $Bitmap.Save($Path, $codec, $encoderParameters)
  $encoderParameters.Dispose()
}

if (-not (Test-Path $backupDir)) {
  New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

if (-not (Test-Path $backupPath)) {
  Copy-Item $path $backupPath
}

$bitmap = [System.Drawing.Bitmap]::FromFile($path)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$titleRect = New-Object System.Drawing.RectangleF -ArgumentList @(1042, 94, 1532, 166)
$radius = 83.0
$titleColor = [System.Drawing.Color]::FromArgb(255, 106, 85, 155)
$textColor = [System.Drawing.Color]::White
$shadowColor = [System.Drawing.Color]::FromArgb(50, 0, 0, 0)
$titleText = 'KISLA ZEMLJA'
$fontFamily = Get-FontFamilyName

$pathFigure = New-Object System.Drawing.Drawing2D.GraphicsPath
$x = [double]$titleRect.X
$y = [double]$titleRect.Y
$w = [double]$titleRect.Width
$h = [double]$titleRect.Height
$d = $radius * 2
$pathFigure.AddArc($x, $y, $d, $d, 180, 90)
$pathFigure.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
$pathFigure.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
$pathFigure.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
$pathFigure.CloseFigure()

$titleBrush = New-Object System.Drawing.SolidBrush($titleColor)
$textBrush = New-Object System.Drawing.SolidBrush($textColor)
$shadowBrush = New-Object System.Drawing.SolidBrush($shadowColor)

$graphics.FillPath($titleBrush, $pathFigure)

$font = $null
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$format.Trimming = [System.Drawing.StringTrimming]::EllipsisCharacter

for ($size = 88; $size -ge 70; $size -= 1) {
  $candidate = New-Object System.Drawing.Font($fontFamily, $size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $measured = $graphics.MeasureString($titleText, $candidate)
  if ($measured.Width -le ($titleRect.Width - 140) -and $measured.Height -le ($titleRect.Height - 28)) {
    $font = $candidate
    break
  }
  $candidate.Dispose()
}

if ($null -eq $font) {
  $font = New-Object System.Drawing.Font($fontFamily, 70, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
}

$shadowRect = New-Object System.Drawing.RectangleF -ArgumentList @(($titleRect.X + 2), ($titleRect.Y + 2), $titleRect.Width, $titleRect.Height)
$graphics.DrawString($titleText, $font, $shadowBrush, $shadowRect, $format)
$graphics.DrawString($titleText, $font, $textBrush, $titleRect, $format)

$tempPath = Join-Path ([System.IO.Path]::GetDirectoryName($path)) '05_kisloljubne_rastline.tmp.jpg'
Save-Jpeg -Bitmap $bitmap -Path $tempPath

$font.Dispose()
$format.Dispose()
$titleBrush.Dispose()
$textBrush.Dispose()
$shadowBrush.Dispose()
$pathFigure.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Move-Item -Force $tempPath $path
Write-Host 'Updated title to KISLA ZEMLJA.'
