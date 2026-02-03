# DEBUG NOTES

## Problema 1

Imaginea de mai jos este rezultatul a doua probleme concomitente. Prima a fost faptul ca am folosit in functia de create connection
un host numit "mysql_db" pentru ca acesta era numele dat de mine containerului de mysql, insa trebuia sa folosesc "app_db" care este
numele real al bazei de date dat de mine in docker-compose.
A doua problema este faptul ca serverul porneste inaintea bazei de date, asa ca se poate rezolva fie printr-un restart al containerului
(prima solutie la indemana pe development) sau printr-un healthcheck in docker-compose + un sistem de retry in server.js ca backup.
![Problema 1](./images/prob1.png)
