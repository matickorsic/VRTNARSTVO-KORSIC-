param(
    [string]$UrlListPath = ".\scripts\cloudinary-urls.txt",
    [string]$OutputDirectory = ".\public\images\cloudinary-migration"
)

if (-not (Test-Path $UrlListPath)) {
    throw "URL list not found: $UrlListPath"
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

$urls = Get-Content $UrlListPath | Where-Object { $_.Trim() -ne "" }

foreach ($url in $urls) {
    $fileName = Split-Path ([Uri]$url).AbsolutePath -Leaf
    $destination = Join-Path $OutputDirectory $fileName

    if (Test-Path $destination) {
        Write-Host "Skipping existing file: $fileName"
        continue
    }

    Write-Host "Downloading $fileName"
    Invoke-WebRequest -Uri $url -OutFile $destination
}
