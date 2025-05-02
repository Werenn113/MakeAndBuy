Write-Host "Que veux-tu lancer ?"
Write-Host "1) Backend"
Write-Host "2) Frontend"
Write-Host "3) Les deux"
$choix = Read-Host "Choix (1/2/3)"


switch ($choix) {
    "1" {
        wt --maximized new-tab -p mab_backend `; split-pane -V -p mab_prismastudio
    }
    "2" {
        wt --maximized new-tab -p mab_frontend
    }
    "3" {
        wt --maximized new-tab -p mab_backend `; split-pane -V -p mab_prismastudio `; move-focus left `; split-pane -H -p mab_frontend `; move-focus up `; move-focus right `; split-pane -H -p mab_dir
    }
    default {
        Write-Host "Choix invalide"
    }
}
