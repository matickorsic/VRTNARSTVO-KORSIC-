param(
    [string]$OutputDir = "generated\pot-product-shots",
    [switch]$SkipPngExport
)

$ErrorActionPreference = "Stop"

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$resolvedOutputDir = if ([System.IO.Path]::IsPathRooted($OutputDir)) {
    $OutputDir
} else {
    Join-Path $workspaceRoot $OutputDir
}

$svgDir = Join-Path $resolvedOutputDir "svg"
$pngDir = Join-Path $resolvedOutputDir "png"

New-Item -ItemType Directory -Force -Path $svgDir | Out-Null
New-Item -ItemType Directory -Force -Path $pngDir | Out-Null

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

function Write-Utf8File {
    param(
        [Parameter(Mandatory)]
        [string]$Path,
        [Parameter(Mandatory)]
        [string]$Content
    )

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Get-SharedDefs {
    @'
  <defs>
    <linearGradient id="bgStudio" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f1f1"/>
    </linearGradient>
    <linearGradient id="bgLifestyle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#eef6fb"/>
      <stop offset="45%" stop-color="#f6f0e6"/>
      <stop offset="100%" stop-color="#d8c3aa"/>
    </linearGradient>
    <linearGradient id="potBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#171717"/>
      <stop offset="20%" stop-color="#272727"/>
      <stop offset="50%" stop-color="#2f2f2f"/>
      <stop offset="80%" stop-color="#242424"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
    <linearGradient id="potBase" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#131313"/>
      <stop offset="50%" stop-color="#212121"/>
      <stop offset="100%" stop-color="#0f0f0f"/>
    </linearGradient>
    <linearGradient id="rimOuter" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#232323"/>
      <stop offset="30%" stop-color="#3a3a3a"/>
      <stop offset="70%" stop-color="#292929"/>
      <stop offset="100%" stop-color="#151515"/>
    </linearGradient>
    <linearGradient id="rimInner" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="50%" stop-color="#1b1b1b"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5b4230"/>
      <stop offset="100%" stop-color="#3b281d"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5f9d3d"/>
      <stop offset="100%" stop-color="#2d6d34"/>
    </linearGradient>
    <linearGradient id="leafMidrib" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9fca72"/>
      <stop offset="100%" stop-color="#5e8c4e"/>
    </linearGradient>
    <linearGradient id="deckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#af8a63"/>
      <stop offset="100%" stop-color="#8a6647"/>
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="plantShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <filter id="subtleBlur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <clipPath id="potClip">
      <path d="M540 432
               C610 400 1390 400 1460 432
               L1425 1110
               C1417 1165 1338 1206 1245 1226
               L755 1226
               C662 1206 583 1165 575 1110
               Z"/>
    </clipPath>
    <clipPath id="potClipTop">
      <path d="M570 468
               C635 430 1365 430 1430 468
               L1400 1056
               C1394 1096 1332 1129 1252 1147
               L748 1147
               C668 1129 606 1096 600 1056
               Z"/>
    </clipPath>
  </defs>
'@
}

function Get-PotMarkup {
    param(
        [double]$CenterX = 1000,
        [double]$TopY = 420,
        [double]$Scale = 1.0,
        [double]$Yaw = 0.0,
        [double]$Tilt = 0.0,
        [double]$Emblem = 0.0,
        [double]$HighlightBias = 0.0,
        [switch]$TopView,
        [switch]$IncludeSoil
    )

    $bodyTranslateX = [math]::Round($CenterX - 1000, 2)
    $bodyTranslateY = [math]::Round($TopY - 420, 2)
    $transform = "translate($bodyTranslateX $bodyTranslateY) scale($Scale) skewX($Yaw) rotate($Tilt 1000 900)"

    $highlightX = [math]::Round(1015 + ($HighlightBias * 135), 2)
    $shadowX = [math]::Round(965 - ($HighlightBias * 105), 2)
    $emblemX = [math]::Round(1000 + ($Emblem * 280), 2)
    $emblemOpacity = if ([math]::Abs($Emblem) -gt 0.78) { 0.0 } elseif ([math]::Abs($Emblem) -gt 0.52) { 0.38 } else { 1.0 }
    $clipId = if ($TopView) { "potClipTop" } else { "potClip" }
    $topOuter = if ($TopView) { '<ellipse cx="1000" cy="462" rx="430" ry="98" fill="url(#rimOuter)"/>' } else { '<ellipse cx="1000" cy="448" rx="460" ry="86" fill="url(#rimOuter)"/>' }
    $topInner = if ($TopView) { '<ellipse cx="1000" cy="470" rx="346" ry="70" fill="url(#rimInner)"/>' } else { '<ellipse cx="1000" cy="458" rx="360" ry="60" fill="url(#rimInner)"/>' }
    $baseY = if ($TopView) { 1038 } else { 1088 }
    $baseEllipseY = if ($TopView) { 1132 } else { 1194 }
    $bodyBottomY = if ($TopView) { 1054 } else { 1124 }
    $soil = if ($IncludeSoil) {
@'
      <ellipse cx="1000" cy="476" rx="332" ry="63" fill="url(#soilGrad)" opacity="0.98"/>
      <ellipse cx="1000" cy="482" rx="300" ry="52" fill="#2f2218" opacity="0.32"/>
'@
    } else {
        ''
    }

    $ribBuilder = New-Object System.Text.StringBuilder
    for ($i = 0; $i -lt 26; $i++) {
        $x = 620 + ($i * 31)
        $width = if ($i % 2 -eq 0) { 20 } else { 16 }
        $alpha = if ($i % 2 -eq 0) { 0.18 } else { 0.11 }
        $offset = ($i - 12.5) / 12.5
        $shade = [math]::Max(0.05, 0.20 - ([math]::Abs($offset) * 0.08))
        [void]$ribBuilder.AppendLine("      <rect x=""$x"" y=""468"" width=""$width"" height=""690"" rx=""8"" fill=""rgba(255,255,255,$alpha)""/>")
        [void]$ribBuilder.AppendLine("      <rect x=""$([math]::Round($x + 9, 2))"" y=""468"" width=""7"" height=""690"" rx=""3.5"" fill=""rgba(0,0,0,$([math]::Round($shade, 3)))""/>")
    }

@"
  <g transform="$transform">
    <ellipse cx="$shadowX" cy="1238" rx="346" ry="78" fill="rgba(0,0,0,0.18)" filter="url(#softShadow)"/>
    <path d="M540 448
             C605 412 1395 412 1460 448
             L1425 $bodyBottomY
             C1412 1185 1340 1217 1245 1236
             L755 1236
             C660 1217 588 1185 575 $bodyBottomY
             Z"
          fill="url(#potBody)"/>
    <g clip-path="url(#$clipId)">
      <rect x="536" y="430" width="930" height="770" fill="url(#potBody)"/>
$($ribBuilder.ToString())
      <ellipse cx="$highlightX" cy="840" rx="210" ry="520" fill="rgba(255,255,255,0.075)" filter="url(#subtleBlur)"/>
      <ellipse cx="$shadowX" cy="840" rx="260" ry="560" fill="rgba(0,0,0,0.12)" filter="url(#subtleBlur)"/>
    </g>
    <rect x="644" y="$baseY" width="712" height="118" rx="22" fill="url(#potBase)"/>
    <ellipse cx="1000" cy="$baseEllipseY" rx="356" ry="66" fill="url(#potBase)"/>
    $topOuter
    $topInner
    $soil
    <g opacity="$emblemOpacity">
      <rect x="$([math]::Round($emblemX - 19, 2))" y="496" width="38" height="232" rx="18" fill="rgba(255,255,255,0.10)"/>
      <rect x="$([math]::Round($emblemX - 11, 2))" y="504" width="22" height="216" rx="11" fill="rgba(0,0,0,0.32)"/>
      <ellipse cx="$emblemX" cy="532" rx="50" ry="58" fill="rgba(255,255,255,0.10)"/>
      <ellipse cx="$emblemX" cy="532" rx="36" ry="43" fill="rgba(0,0,0,0.30)"/>
    </g>
  </g>
"@
}

function Get-LeafMarkup {
    param(
        [string]$Transform,
        [double]$Rotation = 0.0,
        [string]$Scale = "1 1"
    )

@"
    <g transform="$Transform rotate($Rotation)">
      <path d="M0 0
               C34 -165 168 -260 224 -370
               C294 -284 298 -149 242 -44
               C192 46 80 84 0 0 Z"
            fill="url(#leafGrad)"/>
      <path d="M10 -2
               C64 -136 162 -228 212 -330"
            stroke="url(#leafMidrib)"
            stroke-width="9"
            stroke-linecap="round"
            fill="none"/>
      <path d="M128 -152
               C154 -214 188 -272 216 -322"
            stroke="rgba(255,255,255,0.16)"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"/>
    </g>
"@
}

function Get-StrelitziaMarkup {
@'
  <g>
    <ellipse cx="1084" cy="1410" rx="346" ry="92" fill="rgba(0,0,0,0.18)" filter="url(#plantShadow)"/>
    <path d="M1004 534 C994 760 988 1010 986 1274" stroke="#537a37" stroke-width="11" stroke-linecap="round" fill="none"/>
    <path d="M923 602 C943 806 952 1012 958 1270" stroke="#648a3e" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M1090 610 C1070 826 1064 1020 1059 1288" stroke="#486f32" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M1172 688 C1142 880 1128 1068 1120 1300" stroke="#527d39" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M850 720 C890 936 910 1086 922 1280" stroke="#618943" stroke-width="7" stroke-linecap="round" fill="none"/>
    <g opacity="0.92">
      <path d="M1000 482 C1044 428 1084 410 1128 390 C1123 438 1089 486 1034 530 Z" fill="#2f5d70"/>
      <path d="M1028 468 C1088 414 1134 390 1184 372 C1160 446 1120 514 1072 564 Z" fill="#f4881f"/>
      <path d="M1046 518 C1090 476 1124 460 1166 452 C1134 512 1098 560 1046 602 Z" fill="#f0a426"/>
      <path d="M1018 520 C986 494 958 482 924 474 C952 526 986 564 1020 592 Z" fill="#4f7d34"/>
    </g>
    <g opacity="0.95">
      <path d="M915 660 C952 612 987 592 1030 572 C1014 632 984 686 944 726 Z" fill="#2f5d70"/>
      <path d="M938 648 C992 598 1032 580 1074 564 C1050 632 1015 688 968 740 Z" fill="#f4881f"/>
      <path d="M952 692 C996 656 1026 644 1064 638 C1038 688 1006 732 960 770 Z" fill="#f1ab35"/>
    </g>
    <g>
      <path d="M821 1222 L842 1028" stroke="#688e47" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M1166 1260 L1178 1038" stroke="#628744" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M1080 1288 L1088 1080" stroke="#5b8240" stroke-width="7" stroke-linecap="round" fill="none"/>
    </g>
    <g>
      <path d="M1008 960 C944 944 872 906 846 830 C942 792 1048 828 1120 886 C1094 934 1060 962 1008 960 Z" fill="url(#leafGrad)"/>
      <path d="M1000 952 C984 906 950 864 898 836" stroke="url(#leafMidrib)" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M1120 884 C1140 810 1208 742 1294 700 C1324 792 1298 888 1230 960 C1178 944 1148 920 1120 884 Z" fill="url(#leafGrad)"/>
      <path d="M1124 888 C1166 844 1202 792 1260 734" stroke="url(#leafMidrib)" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M956 736 C920 642 842 570 734 522 C706 628 726 744 808 834 C880 816 922 780 956 736 Z" fill="url(#leafGrad)"/>
      <path d="M948 736 C892 686 838 632 768 560" stroke="url(#leafMidrib)" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M1088 690 C1136 604 1224 552 1336 522 C1350 628 1318 746 1236 826 C1164 802 1124 758 1088 690 Z" fill="url(#leafGrad)"/>
      <path d="M1096 690 C1160 642 1216 598 1280 548" stroke="url(#leafMidrib)" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M874 1050 C810 1028 750 986 710 930 C790 890 886 900 962 944 C952 1000 924 1032 874 1050 Z" fill="url(#leafGrad)"/>
      <path d="M1144 1030 C1210 1000 1268 946 1308 874 C1222 852 1144 880 1078 942 C1086 990 1108 1014 1144 1030 Z" fill="url(#leafGrad)"/>
    </g>
  </g>
'@
}

function Get-StudioSvg {
    param(
        [string]$Title,
        [double]$Yaw,
        [double]$Tilt,
        [double]$Emblem,
        [double]$HighlightBias,
        [switch]$TopView
    )

    $pot = Get-PotMarkup -Yaw $Yaw -Tilt $Tilt -Emblem $Emblem -HighlightBias $HighlightBias -TopView:$TopView
@"
<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
$(Get-SharedDefs)
  <rect width="2000" height="2000" fill="url(#bgStudio)"/>
  <rect x="0" y="1294" width="2000" height="706" fill="#f7f7f7"/>
  <ellipse cx="1000" cy="1528" rx="620" ry="118" fill="rgba(0,0,0,0.04)" filter="url(#softShadow)"/>
  <text x="1000" y="172" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="58" fill="#1d1d1d" letter-spacing="3">$Title</text>
  <text x="1000" y="235" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#808080" letter-spacing="2">ribbed planter mockup</text>
$pot
</svg>
"@
}

function Get-LifestyleSvg {
    $pot = Get-PotMarkup -CenterX 1022 -TopY 700 -Scale 1.06 -Yaw -2.5 -Tilt -2 -Emblem -0.1 -HighlightBias 0.1 -IncludeSoil
    $plant = Get-StrelitziaMarkup
@"
<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
$(Get-SharedDefs)
  <rect width="2000" height="2000" fill="url(#bgLifestyle)"/>
  <rect x="0" y="0" width="2000" height="920" fill="#f0f7fb"/>
  <rect x="0" y="510" width="2000" height="470" fill="#efe5d6"/>
  <rect x="0" y="920" width="2000" height="1080" fill="#9e7958"/>
  <g opacity="0.6" filter="url(#subtleBlur)">
    <ellipse cx="290" cy="540" rx="230" ry="116" fill="#cad7be"/>
    <ellipse cx="1710" cy="564" rx="274" ry="124" fill="#c3d3bd"/>
    <ellipse cx="942" cy="506" rx="326" ry="122" fill="#d7d8c5"/>
  </g>
  <g opacity="0.52">
    <rect x="126" y="968" width="1748" height="960" fill="url(#deckGrad)"/>
    <path d="M126 1172 H1874" stroke="rgba(255,255,255,0.17)" stroke-width="6"/>
    <path d="M126 1378 H1874" stroke="rgba(255,255,255,0.12)" stroke-width="5"/>
    <path d="M126 1582 H1874" stroke="rgba(255,255,255,0.10)" stroke-width="4"/>
    <path d="M382 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
    <path d="M648 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
    <path d="M914 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
    <path d="M1180 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
    <path d="M1446 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
    <path d="M1712 968 V1928" stroke="rgba(70,45,28,0.26)" stroke-width="6"/>
  </g>
  <g opacity="0.8">
    <rect x="186" y="606" width="1628" height="40" rx="20" fill="#6e7273"/>
    <rect x="240" y="646" width="22" height="250" fill="#7d8284"/>
    <rect x="1740" y="646" width="22" height="250" fill="#7d8284"/>
    <rect x="994" y="646" width="22" height="250" fill="#7d8284"/>
  </g>
  <text x="186" y="182" font-family="Segoe UI, Arial, sans-serif" font-size="58" fill="#1d1d1d" letter-spacing="2">Lifestyle mockup</text>
  <text x="186" y="244" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#6b6b6b" letter-spacing="1.2">terrace scene with flowering strelitzia</text>
$pot
$plant
</svg>
"@
}

$shots = @(
    @{
        Name = "01-front-view"
        Svg = Get-StudioSvg -Title "Front View" -Yaw 0 -Tilt 0 -Emblem 0 -HighlightBias 0
    },
    @{
        Name = "02-left-angle"
        Svg = Get-StudioSvg -Title "Left Angle" -Yaw -3.2 -Tilt -1.5 -Emblem -0.42 -HighlightBias -0.32
    },
    @{
        Name = "03-right-angle"
        Svg = Get-StudioSvg -Title "Right Angle" -Yaw 3.2 -Tilt 1.5 -Emblem 0.42 -HighlightBias 0.34
    },
    @{
        Name = "04-top-detail"
        Svg = Get-StudioSvg -Title "Top Detail" -Yaw -1.2 -Tilt 0 -Emblem 0.84 -HighlightBias 0.12 -TopView
    },
    @{
        Name = "05-terrace-strelitzia"
        Svg = Get-LifestyleSvg
    }
)

foreach ($shot in $shots) {
    $svgPath = Join-Path $svgDir ($shot.Name + ".svg")
    $pngPath = Join-Path $pngDir ($shot.Name + ".png")
    Write-Utf8File -Path $svgPath -Content $shot.Svg

    if (-not $SkipPngExport) {
        & $edgePath `
            --headless `
            --disable-gpu `
            --hide-scrollbars `
            --window-size=2000,2000 `
            "--screenshot=$pngPath" `
            ("file:///" + ($svgPath -replace "\\", "/"))
    }
}

Write-Host "Created product shots in:"
Write-Host "  SVG: $svgDir"
Write-Host "  PNG: $pngDir"
