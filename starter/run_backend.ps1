Write-Host 'Démarrage de Docker Desktop...'
Start-Process -FilePath 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
Start-Sleep -Seconds 3
docker compose up -d
Start-Sleep -Seconds 5
npm run start:dev
