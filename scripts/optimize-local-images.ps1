param(
    [string]$SourceDirectory = ".\public\images\cloudinary-migration",
    [string]$OutputDirectory = ".\public\images\optimized",
    [int]$MaxDimension = 1600,
    [int]$JpegQuality = 82
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $SourceDirectory)) {
    throw "Source directory not found: $SourceDirectory"
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }

function New-ResizedBitmap {
    param(
        [System.Drawing.Image]$Image,
        [int]$TargetWidth,
        [int]$TargetHeight
    )

    $bitmap = New-Object System.Drawing.Bitmap($TargetWidth, $TargetHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $graphics.DrawImage($Image, 0, 0, $TargetWidth, $TargetHeight)
    $graphics.Dispose()

    return $bitmap
}

function Set-ImageOrientation {
    param(
        [System.Drawing.Image]$Image
    )

    $orientationId = 274
    $orientationProperty = $Image.PropertyItems | Where-Object { $_.Id -eq $orientationId } | Select-Object -First 1

    if (-not $orientationProperty) {
        return
    }

    $orientation = [int]$orientationProperty.Value[0]
    $rotateFlipType = [System.Drawing.RotateFlipType]::RotateNoneFlipNone

    switch ($orientation) {
        2 { $rotateFlipType = [System.Drawing.RotateFlipType]::RotateNoneFlipX }
        3 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate180FlipNone }
        4 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate180FlipX }
        5 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate90FlipX }
        6 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate90FlipNone }
        7 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate270FlipX }
        8 { $rotateFlipType = [System.Drawing.RotateFlipType]::Rotate270FlipNone }
        default { return }
    }

    $Image.RotateFlip($rotateFlipType)
}

Get-ChildItem $SourceDirectory -File | ForEach-Object {
    $sourcePath = $_.FullName
    $destinationPath = Join-Path $OutputDirectory $_.Name
    $extension = $_.Extension.ToLowerInvariant()

    $image = [System.Drawing.Image]::FromFile($sourcePath)

    try {
        Set-ImageOrientation -Image $image

        $widthScale = [double]$MaxDimension / [double]$image.Width
        $heightScale = [double]$MaxDimension / [double]$image.Height
        $scale = [Math]::Min(
            1.0,
            [Math]::Min($widthScale, $heightScale)
        )

        $targetWidth = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
        $targetHeight = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))

        $bitmap = New-ResizedBitmap -Image $image -TargetWidth $targetWidth -TargetHeight $targetHeight

        try {
            switch ($extension) {
                ".jpg" { 
                    $encoder = New-Object System.Drawing.Imaging.EncoderParameters(1)
                    $encoder.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                        [System.Drawing.Imaging.Encoder]::Quality,
                        [long]$JpegQuality
                    )
                    $bitmap.Save($destinationPath, $jpegCodec, $encoder)
                    $encoder.Dispose()
                }
                ".jpeg" {
                    $encoder = New-Object System.Drawing.Imaging.EncoderParameters(1)
                    $encoder.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                        [System.Drawing.Imaging.Encoder]::Quality,
                        [long]$JpegQuality
                    )
                    $bitmap.Save($destinationPath, $jpegCodec, $encoder)
                    $encoder.Dispose()
                }
                ".png" {
                    $bitmap.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
                }
                default {
                    Copy-Item $sourcePath $destinationPath -Force
                }
            }
        }
        finally {
            $bitmap.Dispose()
        }
    }
    finally {
        $image.Dispose()
    }
}
