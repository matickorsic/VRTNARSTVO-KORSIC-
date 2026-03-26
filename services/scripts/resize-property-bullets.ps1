$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $root 'backup_before_bullet_resize_2026-03-26'

function Expand-Slovene {
  param(
    [string]$Text
  )

  return $Text.
    Replace('{c}', [string][char]0x010D).
    Replace('{C}', [string][char]0x010C).
    Replace('{s}', [string][char]0x0161).
    Replace('{S}', [string][char]0x0160).
    Replace('{z}', [string][char]0x017E).
    Replace('{Z}', [string][char]0x017D)
}

$targets = @(
  @{
    Path = 'jpg_za_tisk_pacciamanti\01_francosko_lubje_15_25.jpg'
    Bullets = @(
      'ZA OKRASITEV VRTA IN GREDIC'
      'ZMANJ{S}UJE RAST PLEVELA'
      'TOPLOTNO IZOLACIJSKO DELOVANJE'
    )
  }
  @{
    Path = 'jpg_za_tisk_pacciamanti\02_francosko_lubje_25_40.jpg'
    Bullets = @(
      'ZA OKRASITEV VRTA IN GREDIC'
      'ZMANJ{S}UJE RAST PLEVELA'
      'TOPLOTNO IZOLACIJSKO DELOVANJE'
    )
  }
  @{
    Path = 'jpg_za_tisk_pacciamanti\05_italijansko_lubje.jpg'
    Bullets = @(
      'ZA OKRASITEV VRTA IN GREDIC'
      'ZMANJ{S}UJE RAST PLEVELA'
      'TOPLOTNO IZOLACIJSKO DELOVANJE'
    )
  }
  @{
    Path = 'jpg_za_tisk_pacciamanti\06_ekspandirana_glina.jpg'
    Bullets = @(
      'ZA OKRASITEV LONCEV, VRTA IN GREDIC'
      'POSPE{S}UJE DRENA{Z}O'
      'RAHLJA TLA'
    )
  }
  @{
    Path = 'jpg_za_tisk_pacciamanti\07_rdeca_vulkanska_lava.jpg'
    Bullets = @(
      'ZA OKRASITEV LONCEV, VRTA IN GREDIC'
      'NESPREMENLJIV SKOZI {C}AS'
      '{S}{C}ITI PRED PLEVELOM'
    )
  }
  @{
    Path = 'jpg_za_tisk_pacciamanti\08_plovec.jpg'
    Bullets = @(
      'ZA OKRASITEV LONCEV, VRTA IN GREDIC'
      'ZA IZBOLJ{S}ANJE IN RAZRAHLJANJE TAL'
      'IZRAZIT DRENIRNI U{C}INEK'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\05_kisloljubne_rastline.jpg'
    Bullets = @(
      'Z DOLGODELUJO{C}IM GNOJILOM'
      'INTENZIVNE IN SIJAJNE BARVE CVETOV'
      'S HRANILI ZA BUJNO RAST'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\06_cvetoce_rastline.jpg'
    Bullets = @(
      'Z GNOJILOM S TAKOJ{S}NJIM U{C}INKOM'
      'BOGATO IN DOLGOTRAJNO CVETENJE'
      'S HRANILI ZA BUJNO RAST'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\09_orhideje.jpg'
    Bullets = @(
      'PROFESIONALNA FORMULA Z IZBRANIM LUBJEM'
      'INTENZIVNO IN DOLGOTRAJNO UKORENINJANJE'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\12_aromaticna_zelisca.jpg'
    Bullets = @(
      'S PLAVCEM ZA BOLJ{S}O DRENA{Z}O'
      'NARAVEN PRIDELEK IN INTENZIVNA AROMA'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\13_bogat_vrtni_substrat.jpg'
    Bullets = @(
      'S KREMENOVIM PESKOM ZA BOLJ{S}O STRUKTURO TAL'
      'OKUSEN IN BOGAT PRIDELEK'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\14_citrusi.jpg'
    Bullets = @(
      'S PLAVCEM ZA BOLJ{S}O DRENA{Z}O'
      'OBILNI IN SO{C}NI PLODOVI'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\18_trava.jpg'
    Bullets = @(
      'SETEV IN OBNOVA TRAVNE RU{S}E'
      'S KREMENOVIM PESKOM ZA HITRO ZGO{S}{C}EVANJE'
      'ME{S}ANICA PROTI MAHU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\21_zelene_rastline.jpg'
    Bullets = @(
      'S PERLITOM ZA BOLJ{S}E ZRA{C}ENJE KORENIN'
      'INTENZIVNEJ{S}A BARVA LISTOV'
      'S HRANILI ZA BUJNO RAST'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\22_peletiran_kurji_gnoj.jpg'
    Bullets = @(
      'IZBOLJ{S}A STRUKTURO TAL'
      'BOGAT Z ORGANSKO SNOVJO'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
  @{
    Path = 'jpg_za_tisk_triplo_2026\23_peletiran_hlevski_gnoj.jpg'
    Bullets = @(
      'IZBOLJ{S}A STRUKTURO TAL'
      'BOGAT Z ORGANSKO SNOVJO'
      'DOVOLJENO V EKOLO{S}KEM KMETOVANJU'
    )
  }
)

foreach ($target in $targets) {
  $target.Bullets = @($target.Bullets | ForEach-Object { Expand-Slovene $_ })
}

$layout = @{
  FillX = 982
  FillY = 482
  FillWidth = 1618
  FillHeight = 540
  TextX = 1108
  TextY = 492
  TextWidth = 1435
  TextHeight = 458
  Gap = 8
  SampleX = 1900
  SampleY = 930
  SampleSize = 24
}

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

function Get-Font {
  param(
    [string]$Family,
    [float]$Size
  )

  return New-Object System.Drawing.Font($Family, $Size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
}

function Get-AverageColor {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [int]$StartX,
    [int]$StartY,
    [int]$Size
  )

  $maxX = [Math]::Min($Bitmap.Width - 1, $StartX + $Size - 1)
  $maxY = [Math]::Min($Bitmap.Height - 1, $StartY + $Size - 1)

  $r = 0L
  $g = 0L
  $b = 0L
  $count = 0L

  for ($x = $StartX; $x -le $maxX; $x++) {
    for ($y = $StartY; $y -le $maxY; $y++) {
      $pixel = $Bitmap.GetPixel($x, $y)
      $r += $pixel.R
      $g += $pixel.G
      $b += $pixel.B
      $count++
    }
  }

  return [System.Drawing.Color]::FromArgb(
    255,
    [int]($r / $count),
    [int]($g / $count),
    [int]($b / $count)
  )
}

function Measure-BulletLayout {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string[]]$Bullets,
    [string]$Family,
    [float]$FontSize,
    [float]$Width,
    [float]$Gap
  )

  $font = Get-Font -Family $Family -Size $FontSize
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Near
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $format.Trimming = [System.Drawing.StringTrimming]::Word

  $sizes = New-Object System.Collections.Generic.List[double]
  $totalHeight = 0.0

  foreach ($bullet in $Bullets) {
    $measured = $Graphics.MeasureString($bullet, $font, [int][Math]::Ceiling($Width), $format)
    $height = [Math]::Ceiling($measured.Height)
    $sizes.Add($height)
    $totalHeight += $height
  }

  if ($Bullets.Count -gt 1) {
    $totalHeight += $Gap * ($Bullets.Count - 1)
  }

  $font.Dispose()
  $format.Dispose()

  return @{
    Heights = $sizes
    TotalHeight = $totalHeight
  }
}

function Get-BestFontSize {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string[]]$Bullets,
    [string]$Family,
    [float]$Width,
    [float]$Height,
    [float]$Gap
  )

  for ($size = 88; $size -ge 58; $size -= 1) {
    $layoutResult = Measure-BulletLayout -Graphics $Graphics -Bullets $Bullets -Family $Family -FontSize $size -Width $Width -Gap $Gap
    if ($layoutResult.TotalHeight -le $Height) {
      return @{
        FontSize = $size
        Heights = $layoutResult.Heights
        TotalHeight = $layoutResult.TotalHeight
      }
    }
  }

  $fallback = Measure-BulletLayout -Graphics $Graphics -Bullets $Bullets -Family $Family -FontSize 58 -Width $Width -Gap $Gap
  return @{
    FontSize = 58
    Heights = $fallback.Heights
    TotalHeight = $fallback.TotalHeight
  }
}

function Draw-Leaf {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Color]$Color,
    [float]$X,
    [float]$Y,
    [float]$Scale
  )

  $brush = New-Object System.Drawing.SolidBrush($Color)

  $state = $Graphics.Save()
  $Graphics.TranslateTransform($X + (14 * $Scale), $Y + (25 * $Scale))
  $Graphics.RotateTransform(-35)
  $Graphics.FillEllipse($brush, -14 * $Scale, -25 * $Scale, 28 * $Scale, 50 * $Scale)
  $Graphics.Restore($state)

  $state = $Graphics.Save()
  $Graphics.TranslateTransform($X + (37 * $Scale), $Y + (53 * $Scale))
  $Graphics.RotateTransform(20)
  $Graphics.FillEllipse($brush, -11.5 * $Scale, -20 * $Scale, 23 * $Scale, 40 * $Scale)
  $Graphics.Restore($state)

  $brush.Dispose()
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

$fontFamily = Get-FontFamilyName

if (-not (Test-Path $backupRoot)) {
  New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

foreach ($target in $targets) {
  $fullPath = Join-Path $root $target.Path
  if (-not (Test-Path $fullPath)) {
    throw "Missing file: $fullPath"
  }

  $relativeDir = Split-Path $target.Path -Parent
  $backupDir = Join-Path $backupRoot $relativeDir
  if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
  }

  $backupPath = Join-Path $backupDir ([System.IO.Path]::GetFileName($target.Path))
  if (-not (Test-Path $backupPath)) {
    Copy-Item $fullPath $backupPath
  }

  $bitmap = [System.Drawing.Bitmap]::FromFile($fullPath)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $backgroundColor = Get-AverageColor -Bitmap $bitmap -StartX $layout.SampleX -StartY $layout.SampleY -Size $layout.SampleSize
  $leafColor = [System.Drawing.Color]::FromArgb(255, 31, 72, 31)
  $shadowColor = [System.Drawing.Color]::FromArgb(90, 34, 68, 25)
  $textColor = [System.Drawing.Color]::White

  $backgroundBrush = New-Object System.Drawing.SolidBrush($backgroundColor)
  $shadowBrush = New-Object System.Drawing.SolidBrush($shadowColor)
  $textBrush = New-Object System.Drawing.SolidBrush($textColor)

  $graphics.FillRectangle($backgroundBrush, $layout.FillX, $layout.FillY, $layout.FillWidth, $layout.FillHeight)

  $best = Get-BestFontSize -Graphics $graphics -Bullets $target.Bullets -Family $fontFamily -Width $layout.TextWidth -Height $layout.TextHeight -Gap $layout.Gap
  $font = Get-Font -Family $fontFamily -Size $best.FontSize

  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Near
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $format.Trimming = [System.Drawing.StringTrimming]::Word

  $currentY = $layout.TextY + [Math]::Floor(($layout.TextHeight - $best.TotalHeight) / 2)
  $scale = $best.FontSize / 58.0

  for ($index = 0; $index -lt $target.Bullets.Count; $index++) {
    $bullet = $target.Bullets[$index]
    $itemHeight = [double]$best.Heights[$index]
    $textRect = New-Object System.Drawing.RectangleF -ArgumentList @($layout.TextX, $currentY, $layout.TextWidth, ($itemHeight + 12))
    $shadowRect = New-Object System.Drawing.RectangleF -ArgumentList @(($layout.TextX + 4), ($currentY + 4), $layout.TextWidth, ($itemHeight + 12))

    Draw-Leaf -Graphics $graphics -Color $leafColor -X 1016 -Y ($currentY + 10) -Scale $scale
    $graphics.DrawString($bullet, $font, $shadowBrush, $shadowRect, $format)
    $graphics.DrawString($bullet, $font, $textBrush, $textRect, $format)

    $currentY += $itemHeight + $layout.Gap
  }

  $tempPath = [System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($fullPath), ([System.IO.Path]::GetFileNameWithoutExtension($fullPath) + '.tmp.jpg'))
  Save-Jpeg -Bitmap $bitmap -Path $tempPath

  $font.Dispose()
  $format.Dispose()
  $backgroundBrush.Dispose()
  $shadowBrush.Dispose()
  $textBrush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()

  Move-Item -Force $tempPath $fullPath
}

Write-Host "Updated $($targets.Count) images."
