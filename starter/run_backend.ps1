Write-Host 'Démarrage de Docker Desktop...'
Start-Process -FilePath 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
Start-Sleep -Seconds 5
docker compose up -d
npm run start:dev
