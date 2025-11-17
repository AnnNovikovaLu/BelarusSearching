$BackupFile = ".\backup.sql"

$DbContainer = "BelarusSearching-db"

if (-Not (Test-Path $BackupFile)) {
    Write-Error "File $BackupFile not found"
    exit 1
}

Get-Content $BackupFile | docker exec -i $DbContainer psql -U postgres -d belarus-searching-db

Write-Host "The database was restored"
