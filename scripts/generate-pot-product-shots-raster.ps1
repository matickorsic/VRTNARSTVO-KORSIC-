param(
    [string]$OutputDir = "generated\pot-product-shots\png"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$resolvedOutputDir = if ([System.IO.Path]::IsPathRooted($OutputDir)) {
    $OutputDir
} else {
    Join-Path $workspaceRoot $OutputDir
}

New-Item -ItemType Directory -Force -Path $resolvedOutputDir | Out-Null

function New-Color {
    param(
        [Parameter(Mandatory)]
        [string]$Hex,
        [int]$Alpha = 255
    )

    $clean = $Hex.TrimStart('#')
    return [System.Drawing.Color]::FromArgb(
        $Alpha,
        [Convert]::ToInt32($clean.Substring(0, 2), 16),
        [Convert]::ToInt32($clean.Substring(2, 2), 16),
        [Convert]::ToInt32($clean.Substring(4, 2), 16)
    )
}

function New-PointF {
    param([double]$X, [double]$Y)
    return New-Object System.Drawing.PointF([single]$X, [single]$Y)
}

function New-RectF {
    param([double]$X, [double]$Y, [double]$Width, [double]$Height)
    return New-Object System.Drawing.RectangleF([single]$X, [single]$Y, [single]$Width, [single]$Height)
}

function Get-RoundedRectPath {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.RectangleF]$Rect,
        [double]$Radius
    )

    $diameter = [single]([Math]::Min($Radius * 2, [Math]::Min($Rect.Width, $Rect.Height)))
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath

    if ($diameter -le 0.5) {
        $path.AddRectangle($Rect)
        return $path
    }

    $arc = New-RectF $Rect.X $Rect.Y $diameter $diameter
    $path.AddArc($arc, 180, 90)
    $arc.X = $Rect.Right - $diameter
    $path.AddArc($arc, 270, 90)
    $arc.Y = $Rect.Bottom - $diameter
    $path.AddArc($arc, 0, 90)
    $arc.X = $Rect.Left
    $path.AddArc($arc, 90, 90)
    $path.CloseFigure()
    return $path
}

function Draw-SoftEllipse {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [double]$X,
        [double]$Y,
        [double]$Width,
        [double]$Height,
        [Parameter(Mandatory)]
        [string]$Hex,
        [int]$Alpha = 64,
        [int]$Steps = 8,
        [double]$Spread = 90
    )

    for ($i = $Steps; $i -ge 1; $i--) {
        $t = $i / [double]$Steps
        $grow = (1 - $t) * $Spread
        $localAlpha = [int]($Alpha * $t * $t)
        $brush = New-Object System.Drawing.SolidBrush (New-Color $Hex $localAlpha)
        $Graphics.FillEllipse(
            $brush,
            [single]($X - ($grow / 2)),
            [single]($Y - ($grow / 2)),
            [single]($Width + $grow),
            [single]($Height + $grow)
        )
        $brush.Dispose()
    }
}

function Fill-GradientRect {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory)]
        [System.Drawing.RectangleF]$Rect,
        [Parameter(Mandatory)]
        [string]$StartHex,
        [Parameter(Mandatory)]
        [string]$EndHex,
        [Parameter(Mandatory)]
        [System.Drawing.Drawing2D.LinearGradientMode]$Mode
    )

    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($Rect, (New-Color $StartHex), (New-Color $EndHex), $Mode)
    $Graphics.FillRectangle($brush, $Rect)
    $brush.Dispose()
}

function Fill-GradientPath {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory)]
        [System.Drawing.Drawing2D.GraphicsPath]$Path,
        [Parameter(Mandatory)]
        [System.Drawing.RectangleF]$Bounds,
        [Parameter(Mandatory)]
        [string]$StartHex,
        [Parameter(Mandatory)]
        [string]$EndHex,
        [System.Drawing.Drawing2D.LinearGradientMode]$Mode = [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
    )

    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($Bounds, (New-Color $StartHex), (New-Color $EndHex), $Mode)
    $Graphics.FillPath($brush, $Path)
    $brush.Dispose()
}

function Draw-OutlineEllipse {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory)]
        [System.Drawing.RectangleF]$Rect,
        [Parameter(Mandatory)]
        [string]$Hex,
        [double]$Width,
        [int]$Alpha = 255
    )

    $pen = New-Object System.Drawing.Pen((New-Color $Hex $Alpha), [single]$Width)
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $Graphics.DrawEllipse($pen, $Rect)
    $pen.Dispose()
}

function Draw-Pot {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [double]$OffsetX = 0,
        [double]$OffsetY = 0,
        [double]$Scale = 1.0,
        [double]$EmblemShift = 0.0,
        [double]$HighlightBias = 0.0,
        [switch]$TopView,
        [switch]$IncludeSoil
    )

    $cx = 1000 + $OffsetX
    $outerRx = if ($TopView) { 430 * $Scale } else { 460 * $Scale }
    $outerRy = if ($TopView) { 98 * $Scale } else { 86 * $Scale }
    $innerRx = if ($TopView) { 346 * $Scale } else { 360 * $Scale }
    $innerRy = if ($TopView) { 70 * $Scale } else { 60 * $Scale }
    $topCyBase = if ($TopView) { 462 } else { 448 }
    $innerCyBase = if ($TopView) { 470 } else { 458 }
    $bodyTopBase = if ($TopView) { 468 } else { 465 }
    $bodyBottomBase = if ($TopView) { 1054 } else { 1124 }
    $baseTopBase = if ($TopView) { 1038 } else { 1088 }
    $baseEllipseYBase = if ($TopView) { 1132 } else { 1194 }
    $topCy = $topCyBase + $OffsetY
    $innerCy = $innerCyBase + $OffsetY
    $bodyTop = $bodyTopBase + $OffsetY
    $bodyBottom = $bodyBottomBase + $OffsetY
    $bodyLeft = $cx - (425 * $Scale)
    $bodyRight = $cx + (425 * $Scale)
    $bodyBottomLeft = $cx - (390 * $Scale)
    $bodyBottomRight = $cx + (390 * $Scale)
    $baseTop = $baseTopBase + $OffsetY
    $baseHeight = 118 * $Scale
    $baseWidth = 712 * $Scale
    $baseLeft = $cx - ($baseWidth / 2)
    $baseEllipseY = $baseEllipseYBase + $OffsetY
    $baseEllipseRx = 356 * $Scale
    $baseEllipseRy = 66 * $Scale

    Draw-SoftEllipse -Graphics $Graphics -X ($cx - (356 * $Scale)) -Y ($bodyBottom + 54 * $Scale) -Width (712 * $Scale) -Height (120 * $Scale) -Hex '#000000' -Alpha 46 -Steps 9 -Spread (150 * $Scale)

    $bodyPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bodyPath.AddPolygon([System.Drawing.PointF[]]@(
        (New-PointF $bodyLeft $bodyTop),
        (New-PointF $bodyRight $bodyTop),
        (New-PointF $bodyBottomRight $bodyBottom),
        (New-PointF $bodyBottomLeft $bodyBottom)
    ))

    $bodyBounds = $bodyPath.GetBounds()
    Fill-GradientPath -Graphics $Graphics -Path $bodyPath -Bounds $bodyBounds -StartHex '#171717' -EndHex '#111111'

    $clipState = $Graphics.Save()
    $Graphics.SetClip($bodyPath)

    $bodyRect = New-RectF ($bodyBounds.X - 20) ($bodyBounds.Y - 20) ($bodyBounds.Width + 40) ($bodyBounds.Height + 40)
    $bodyBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bodyRect, (New-Color '#1b1b1b'), (New-Color '#303030'), [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
    $blend = New-Object System.Drawing.Drawing2D.ColorBlend
    $blend.Colors = [System.Drawing.Color[]]@(
        (New-Color '#151515'),
        (New-Color '#272727'),
        (New-Color '#323232'),
        (New-Color '#262626'),
        (New-Color '#0f0f0f')
    )
    $blend.Positions = [single[]]@(0.0, 0.22, 0.52, 0.78, 1.0)
    $bodyBrush.InterpolationColors = $blend
    $Graphics.FillRectangle($bodyBrush, $bodyRect)
    $bodyBrush.Dispose()

    $ribCount = 26
    $ribSpan = ($bodyRight - $bodyLeft) / ($ribCount + 2)
    for ($i = 0; $i -lt $ribCount; $i++) {
        $x = $bodyLeft + (($i + 1.2) * $ribSpan)
        $ribWidth = if ($i % 2 -eq 0) { 20 * $Scale } else { 16 * $Scale }
        $brightAlpha = if ($i % 2 -eq 0) { 42 } else { 26 }
        $darkAlpha = 28
        $ribPath = Get-RoundedRectPath -Rect (New-RectF $x $bodyTop ($ribWidth) ($bodyBottom - $bodyTop + 8 * $Scale)) -Radius (8 * $Scale)
        $ribBrush = New-Object System.Drawing.SolidBrush (New-Color '#ffffff' $brightAlpha)
        $Graphics.FillPath($ribBrush, $ribPath)
        $ribBrush.Dispose()

        $centerPath = Get-RoundedRectPath -Rect (New-RectF ($x + (7 * $Scale)) $bodyTop (7 * $Scale) ($bodyBottom - $bodyTop + 8 * $Scale)) -Radius (3.5 * $Scale)
        $centerBrush = New-Object System.Drawing.SolidBrush (New-Color '#000000' $darkAlpha)
        $Graphics.FillPath($centerBrush, $centerPath)
        $centerBrush.Dispose()

        $ribPath.Dispose()
        $centerPath.Dispose()
    }

    $highlightCx = $cx + ($HighlightBias * 135 * $Scale)
    Draw-SoftEllipse -Graphics $Graphics -X ($highlightCx - (155 * $Scale)) -Y ($bodyTop - 20 * $Scale) -Width (310 * $Scale) -Height (720 * $Scale) -Hex '#ffffff' -Alpha 18 -Steps 8 -Spread (90 * $Scale)
    Draw-SoftEllipse -Graphics $Graphics -X (($cx - ($HighlightBias * 90 * $Scale)) - (180 * $Scale)) -Y ($bodyTop + 20 * $Scale) -Width (360 * $Scale) -Height (760 * $Scale) -Hex '#000000' -Alpha 18 -Steps 8 -Spread (110 * $Scale)

    $Graphics.Restore($clipState)

    $basePath = Get-RoundedRectPath -Rect (New-RectF $baseLeft $baseTop $baseWidth $baseHeight) -Radius (22 * $Scale)
    Fill-GradientPath -Graphics $Graphics -Path $basePath -Bounds (New-RectF $baseLeft $baseTop $baseWidth $baseHeight) -StartHex '#131313' -EndHex '#0f0f0f'
    $basePath.Dispose()

    $baseBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-RectF ($cx - $baseEllipseRx) ($baseEllipseY - $baseEllipseRy) ($baseEllipseRx * 2) ($baseEllipseRy * 2)),
        (New-Color '#151515'),
        (New-Color '#0c0c0c'),
        [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
    )
    $Graphics.FillEllipse($baseBrush, (New-RectF ($cx - $baseEllipseRx) ($baseEllipseY - $baseEllipseRy) ($baseEllipseRx * 2) ($baseEllipseRy * 2)))
    $baseBrush.Dispose()

    $rimRect = New-RectF ($cx - $outerRx) ($topCy - $outerRy) ($outerRx * 2) ($outerRy * 2)
    $rimBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rimRect, (New-Color '#232323'), (New-Color '#151515'), [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
    $rimBlend = New-Object System.Drawing.Drawing2D.ColorBlend
    $rimBlend.Colors = [System.Drawing.Color[]]@(
        (New-Color '#1e1e1e'),
        (New-Color '#383838'),
        (New-Color '#2b2b2b'),
        (New-Color '#151515')
    )
    $rimBlend.Positions = [single[]]@(0.0, 0.32, 0.72, 1.0)
    $rimBrush.InterpolationColors = $rimBlend
    $Graphics.FillEllipse($rimBrush, $rimRect)
    $rimBrush.Dispose()

    $innerBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-RectF ($cx - $innerRx) ($innerCy - $innerRy) ($innerRx * 2) ($innerRy * 2)),
        (New-Color '#0b0b0b'),
        (New-Color '#050505'),
        [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
    )
    $Graphics.FillEllipse($innerBrush, (New-RectF ($cx - $innerRx) ($innerCy - $innerRy) ($innerRx * 2) ($innerRy * 2)))
    $innerBrush.Dispose()

    Draw-OutlineEllipse -Graphics $Graphics -Rect $rimRect -Hex '#6b6b6b' -Width (2.5 * $Scale) -Alpha 70
    Draw-OutlineEllipse -Graphics $Graphics -Rect (New-RectF ($cx - $innerRx) ($innerCy - $innerRy) ($innerRx * 2) ($innerRy * 2)) -Hex '#343434' -Width (2.2 * $Scale) -Alpha 120

    if ($IncludeSoil) {
        $soilBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
            (New-RectF ($cx - (332 * $Scale)) (($innerCy + 2 * $Scale) - (63 * $Scale)) (664 * $Scale) (126 * $Scale)),
            (New-Color '#5b4230'),
            (New-Color '#3b281d'),
            [System.Drawing.Drawing2D.LinearGradientMode]::Vertical
        )
        $Graphics.FillEllipse($soilBrush, (New-RectF ($cx - (332 * $Scale)) (($innerCy + 4 * $Scale) - (63 * $Scale)) (664 * $Scale) (126 * $Scale)))
        $soilBrush.Dispose()
        Draw-SoftEllipse -Graphics $Graphics -X ($cx - (276 * $Scale)) -Y (($innerCy + 22 * $Scale) - (44 * $Scale)) -Width (552 * $Scale) -Height (88 * $Scale) -Hex '#000000' -Alpha 24 -Steps 5 -Spread (36 * $Scale)
    }

    $visibility = 1.0 - ([Math]::Min([Math]::Abs($EmblemShift), 0.95) / 0.95)
    if ($visibility -gt 0.02) {
        $emblemCx = $cx + ($EmblemShift * 255 * $Scale)
        $emblemAlpha = [int](90 * $visibility)
        $emblemDarkAlpha = [int](72 * $visibility)
        $outerPillPath = Get-RoundedRectPath -Rect (New-RectF ($emblemCx - (19 * $Scale)) (496 * $Scale + $OffsetY) (38 * $Scale) (232 * $Scale)) -Radius (18 * $Scale)
        $outerPillBrush = New-Object System.Drawing.SolidBrush (New-Color '#ffffff' $emblemAlpha)
        $Graphics.FillPath($outerPillBrush, $outerPillPath)
        $outerPillBrush.Dispose()
        $outerPillPath.Dispose()

        $innerPillPath = Get-RoundedRectPath -Rect (New-RectF ($emblemCx - (11 * $Scale)) (504 * $Scale + $OffsetY) (22 * $Scale) (216 * $Scale)) -Radius (11 * $Scale)
        $innerPillBrush = New-Object System.Drawing.SolidBrush (New-Color '#000000' $emblemDarkAlpha)
        $Graphics.FillPath($innerPillBrush, $innerPillPath)
        $innerPillBrush.Dispose()
        $innerPillPath.Dispose()

        $outerCircleBrush = New-Object System.Drawing.SolidBrush (New-Color '#ffffff' $emblemAlpha)
        $Graphics.FillEllipse($outerCircleBrush, (New-RectF ($emblemCx - (50 * $Scale)) (532 * $Scale + $OffsetY - (58 * $Scale)) (100 * $Scale) (116 * $Scale)))
        $outerCircleBrush.Dispose()
        $innerCircleBrush = New-Object System.Drawing.SolidBrush (New-Color '#000000' $emblemDarkAlpha)
        $Graphics.FillEllipse($innerCircleBrush, (New-RectF ($emblemCx - (36 * $Scale)) (532 * $Scale + $OffsetY - (43 * $Scale)) (72 * $Scale) (86 * $Scale)))
        $innerCircleBrush.Dispose()
    }

    $bodyPath.Dispose()
}

function Draw-Leaf {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory)]
        [System.Drawing.PointF]$BasePoint,
        [Parameter(Mandatory)]
        [System.Drawing.PointF]$TipPoint,
        [double]$Width = 110,
        [string]$StartHex = '#5f9d3d',
        [string]$EndHex = '#2d6d34'
    )

    $dx = $TipPoint.X - $BasePoint.X
    $dy = $TipPoint.Y - $BasePoint.Y
    $length = [Math]::Sqrt(($dx * $dx) + ($dy * $dy))
    if ($length -lt 1) { return }

    $ux = $dx / $length
    $uy = $dy / $length
    $px = -$uy
    $py = $ux

    $baseWidth = $Width * 0.18
    $midWidth1 = $Width
    $midWidth2 = $Width * 0.72

    $leftPoints = @(
        (New-PointF ($BasePoint.X + ($px * $baseWidth)) ($BasePoint.Y + ($py * $baseWidth))),
        (New-PointF ($BasePoint.X + ($dx * 0.26) + ($px * $midWidth1)) ($BasePoint.Y + ($dy * 0.26) + ($py * $midWidth1))),
        (New-PointF ($BasePoint.X + ($dx * 0.63) + ($px * $midWidth2)) ($BasePoint.Y + ($dy * 0.63) + ($py * $midWidth2))),
        $TipPoint
    )
    $rightPoints = @(
        (New-PointF ($BasePoint.X + ($dx * 0.63) - ($px * $midWidth2)) ($BasePoint.Y + ($dy * 0.63) - ($py * $midWidth2))),
        (New-PointF ($BasePoint.X + ($dx * 0.26) - ($px * $midWidth1)) ($BasePoint.Y + ($dy * 0.26) - ($py * $midWidth1))),
        (New-PointF ($BasePoint.X - ($px * $baseWidth)) ($BasePoint.Y - ($py * $baseWidth)))
    )

    $leafPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $leafPath.AddClosedCurve([System.Drawing.PointF[]]($leftPoints + $rightPoints), 0.35)
    $bounds = $leafPath.GetBounds()
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($BasePoint, $TipPoint, (New-Color $StartHex), (New-Color $EndHex))
    $Graphics.FillPath($brush, $leafPath)
    $brush.Dispose()

    $midribPen = New-Object System.Drawing.Pen((New-Color '#8fbe67' 205), 6)
    $midribPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $midribPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $Graphics.DrawLine($midribPen, $BasePoint, $TipPoint)
    $midribPen.Dispose()

    $edgePen = New-Object System.Drawing.Pen((New-Color '#ffffff' 18), 2)
    $edgePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $Graphics.DrawPath($edgePen, $leafPath)
    $edgePen.Dispose()

    $leafPath.Dispose()
}

function Draw-StrelitziaFlower {
    param(
        [Parameter(Mandatory)]
        [System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory)]
        [System.Drawing.PointF]$BasePoint,
        [double]$Scale = 1.0
    )

    $bluePath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bluePath.AddClosedCurve([System.Drawing.PointF[]]@(
        (New-PointF ($BasePoint.X - 8 * $Scale) ($BasePoint.Y + 10 * $Scale)),
        (New-PointF ($BasePoint.X + 30 * $Scale) ($BasePoint.Y - 30 * $Scale)),
        (New-PointF ($BasePoint.X + 108 * $Scale) ($BasePoint.Y - 58 * $Scale)),
        (New-PointF ($BasePoint.X + 64 * $Scale) ($BasePoint.Y + 6 * $Scale)),
        (New-PointF ($BasePoint.X + 12 * $Scale) ($BasePoint.Y + 52 * $Scale))
    ), 0.2)
    $blueBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-PointF $BasePoint.X $BasePoint.Y), (New-PointF ($BasePoint.X + 100 * $Scale) ($BasePoint.Y - 55 * $Scale)), (New-Color '#345f73'), (New-Color '#274b58'))
    $Graphics.FillPath($blueBrush, $bluePath)
    $blueBrush.Dispose()
    $bluePath.Dispose()

    foreach ($petal in @(
        @{ Points = @((0,0),(52,-62),(118,-92),(84,-10)); Start='#f58d21'; End='#ef6d0b' },
        @{ Points = @((18,34),(72,-10),(128,-28),(90,48)); Start='#f3ae2b'; End='#e08716' }
    )) {
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $points = foreach ($pair in $petal.Points) {
            New-PointF ($BasePoint.X + ($pair[0] * $Scale)) ($BasePoint.Y + ($pair[1] * $Scale))
        }
        $path.AddClosedCurve([System.Drawing.PointF[]]$points, 0.18)
        $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-PointF $BasePoint.X $BasePoint.Y), (New-PointF ($BasePoint.X + 118 * $Scale) ($BasePoint.Y - 92 * $Scale)), (New-Color $petal.Start), (New-Color $petal.End))
        $Graphics.FillPath($brush, $path)
        $brush.Dispose()
        $path.Dispose()
    }
}

function Draw-LifestyleScene {
    param([Parameter(Mandatory)][string]$Path)

    $bmp = New-Object System.Drawing.Bitmap 2000, 2000
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $skyBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-RectF 0 0 2000 920), (New-Color '#eef6fb'), (New-Color '#f6f0e6'), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $graphics.FillRectangle($skyBrush, 0, 0, 2000, 920)
    $skyBrush.Dispose()

    $wallBrush = New-Object System.Drawing.SolidBrush (New-Color '#efe5d6')
    $graphics.FillRectangle($wallBrush, 0, 510, 2000, 470)
    $wallBrush.Dispose()

    Draw-SoftEllipse -Graphics $graphics -X 120 -Y 420 -Width 340 -Height 160 -Hex '#cad7be' -Alpha 48 -Steps 7 -Spread 70
    Draw-SoftEllipse -Graphics $graphics -X 1460 -Y 440 -Width 380 -Height 170 -Hex '#c3d3bd' -Alpha 44 -Steps 7 -Spread 80
    Draw-SoftEllipse -Graphics $graphics -X 680 -Y 400 -Width 520 -Height 180 -Hex '#d7d8c5' -Alpha 34 -Steps 7 -Spread 80

    $railBrush = New-Object System.Drawing.SolidBrush (New-Color '#717577')
    $graphics.FillRectangle($railBrush, 186, 606, 1628, 40)
    $graphics.FillRectangle($railBrush, 240, 646, 22, 250)
    $graphics.FillRectangle($railBrush, 994, 646, 22, 250)
    $graphics.FillRectangle($railBrush, 1740, 646, 22, 250)
    $railBrush.Dispose()

    $deckBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-RectF 0 920 2000 1080), (New-Color '#af8a63'), (New-Color '#8a6647'), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $graphics.FillRectangle($deckBrush, 0, 920, 2000, 1080)
    $deckBrush.Dispose()

    $plankPen = New-Object System.Drawing.Pen((New-Color '#c8ae90' 58), 5)
    foreach ($y in 1172, 1378, 1582) {
        $graphics.DrawLine($plankPen, 126, $y, 1874, $y)
    }
    foreach ($x in 382, 648, 914, 1180, 1446, 1712) {
        $graphics.DrawLine($plankPen, $x, 968, $x, 1928)
    }
    $plankPen.Dispose()

    Draw-Pot -Graphics $graphics -OffsetX 24 -OffsetY 250 -Scale 1.08 -EmblemShift -0.1 -HighlightBias 0.1 -IncludeSoil

    $stemPen1 = New-Object System.Drawing.Pen((New-Color '#537a37' 215), 10)
    $stemPen2 = New-Object System.Drawing.Pen((New-Color '#638845' 210), 8)
    $stemPen1.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $stemPen1.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $stemPen2.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $stemPen2.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawBezier($stemPen1, (New-PointF 1030 790), (New-PointF 1010 1020), (New-PointF 1008 1180), (New-PointF 1006 1606))
    $graphics.DrawBezier($stemPen2, (New-PointF 950 858), (New-PointF 966 1100), (New-PointF 976 1270), (New-PointF 978 1606))
    $graphics.DrawBezier($stemPen2, (New-PointF 1120 848), (New-PointF 1098 1070), (New-PointF 1088 1260), (New-PointF 1078 1620))
    $graphics.DrawBezier($stemPen2, (New-PointF 1188 936), (New-PointF 1156 1120), (New-PointF 1144 1310), (New-PointF 1140 1632))
    $graphics.DrawBezier($stemPen2, (New-PointF 862 980), (New-PointF 894 1170), (New-PointF 920 1340), (New-PointF 932 1620))
    $stemPen1.Dispose()
    $stemPen2.Dispose()

    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 1004 1210) -TipPoint (New-PointF 868 822) -Width 122 -StartHex '#6ca94a' -EndHex '#2d6d34'
    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 1058 1228) -TipPoint (New-PointF 1286 746) -Width 128 -StartHex '#6ca34b' -EndHex '#296733'
    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 980 1292) -TipPoint (New-PointF 748 986) -Width 96 -StartHex '#6ea84d' -EndHex '#2f6d36'
    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 1114 1282) -TipPoint (New-PointF 1350 924) -Width 98 -StartHex '#679f45' -EndHex '#2c6733'
    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 1088 1108) -TipPoint (New-PointF 1208 724) -Width 110 -StartHex '#6da64b' -EndHex '#2f6d34'
    Draw-Leaf -Graphics $graphics -BasePoint (New-PointF 930 1118) -TipPoint (New-PointF 794 726) -Width 112 -StartHex '#71ad4e' -EndHex '#316f36'

    Draw-StrelitziaFlower -Graphics $graphics -BasePoint (New-PointF 1018 766) -Scale 1.1
    Draw-StrelitziaFlower -Graphics $graphics -BasePoint (New-PointF 922 940) -Scale 0.92

    Draw-SoftEllipse -Graphics $graphics -X 740 -Y 1504 -Width 760 -Height 140 -Hex '#000000' -Alpha 54 -Steps 10 -Spread 140

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bmp.Dispose()
}

function Draw-StudioScene {
    param(
        [Parameter(Mandatory)][string]$Path,
        [double]$EmblemShift,
        [double]$HighlightBias,
        [switch]$TopView
    )

    $bmp = New-Object System.Drawing.Bitmap 2000, 2000
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-RectF 0 0 2000 2000), (New-Color '#ffffff'), (New-Color '#f2f2f2'), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $graphics.FillRectangle($bgBrush, 0, 0, 2000, 2000)
    $bgBrush.Dispose()
    $floorBrush = New-Object System.Drawing.SolidBrush (New-Color '#f7f7f7')
    $graphics.FillRectangle($floorBrush, 0, 1294, 2000, 706)
    $floorBrush.Dispose()
    Draw-Pot -Graphics $graphics -EmblemShift $EmblemShift -HighlightBias $HighlightBias -TopView:$TopView

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bmp.Dispose()
}

$shots = @(
    @{ Name = '01-front-view.png'; EmblemShift = 0.0; HighlightBias = 0.0; TopView = $false },
    @{ Name = '02-left-angle.png'; EmblemShift = -0.42; HighlightBias = -0.34; TopView = $false },
    @{ Name = '03-right-angle.png'; EmblemShift = 0.42; HighlightBias = 0.34; TopView = $false },
    @{ Name = '04-top-detail.png'; EmblemShift = 0.84; HighlightBias = 0.12; TopView = $true },
    @{ Name = '06-back-view.png'; EmblemShift = 1.0; HighlightBias = -0.05; TopView = $false }
)

foreach ($shot in $shots) {
    Draw-StudioScene -Path (Join-Path $resolvedOutputDir $shot.Name) -EmblemShift $shot.EmblemShift -HighlightBias $shot.HighlightBias -TopView:$shot.TopView
}

Draw-LifestyleScene -Path (Join-Path $resolvedOutputDir '05-terrace-strelitzia.png')

Write-Host "Created PNG shots in $resolvedOutputDir"
