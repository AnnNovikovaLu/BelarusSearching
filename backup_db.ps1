$BackupFile = ".\backup.sql"

$DbContainer = "BelarusSearching-db"

docker exec $DbContainer pg_dump -U postgres belarus-searching-db > $BackupFile

Write-Host "Backup created in file $BackupFile"
