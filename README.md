# Microserviciu pentru comenzi

Timpul alocat pentru implementarea acestui proiect a fost de 3 zile, dupa cum urmeaza:

- Marti - setup Docker, conexiune la baza de date, endpoint de health check
- Miercuri - implementarea endpointurilor, adaugare validare, rate limiting, logging
- Vineri - teste, fix la cateva bug-uri

## Stack-ul folosit

- Node.js
- Express
- MySQL
- Docker
- Jest
- Axios
- express-rate-limit
- Joi
- Winston

## Rulare

Prerequisites: crearea fisierului `.env`.

docker compose up --build

## Endpointuri

API-ul este disponibil la adresa `http://localhost:3000`.

In continuare voi oferi cateva exemple pe care le-am folosit eu in Postman pentru testare manuala.

### Health Check

Request: `curl --location 'http://localhost:3000/health'`.
Response:

```json
{
    "status": "healthy"
}
```

### Creare comanda

Request:

```bash
curl --location 'http://localhost:3000/orders' \
--header 'Content-Type: application/json' \
--data-raw '{
    "order_id": "abdcedfghijklmo1234",
    "customer_email": "test@test.com",
    "total_amount": "7.99",
    "currency": "RON",
    "created_at": "2026-02-03T16:46:33.000Z"
}'
```

Response:

- 201 - creare cu succes (+ json cu payload)
- 200 - comanda exista deja
- 400 - payload invalid (+ json cu eroare)
- 409 - id-ul exista deja, dar cu alt payload (+ json cu mesajul specific)
- 500 - eroare server (+ json cu eroarea aruncata)

### Get comanda

Request:

```bash
curl --location 'http://localhost:3000/orders/abdcedfghijklmo1234'
```

Response:

- 200 - comanda gasita (+ json cu payload)
- 404 - comanda nu exista (+ json cu mesajul "Order not found")
- 500 - eroare server (+ json cu eroarea aruncata)

### Get toate comenzile

Request:

```bash
curl --location 'http://localhost:3000/orders'
```

Response:

- 200 - lista comenzi (+ json cu array de comenzi)
- 500 - eroare server (+ json cu eroarea aruncata)

### Delete comanda

Request:

```bash
curl --location --request DELETE 'http://localhost:3000/orders/abdcedfghijklmo1234'
```

Response:

- 200 - stergere cu succes (+ json cu mesajul "Order deleted successfully")
- 404 - comanda nu exista (+ json cu mesajul "Order not found")
- 500 - eroare server (+ json cu eroarea aruncata)

## Testare

Rularea testelor se face local si trebuie sa ne aflam in /src. De acolo rulam `npm install` pentru ca avem nevoie de Jest si Axios, apoi `npx jest` pentru a rula testele.

## Productie

1. Pe partea de securitate a API-ului as adauga: HTTPS, politica CORS, cel putin un nivel de autentificare (si basic auth ar fi un start bun).
2. As adauga connection pooling pentru baza de date, si in loc de init scripts ce am folosit acum pentru simplitate as folosi migrari.
3. Log-urile sa fie centralizate, momentan doar scriu in consola pentru simplitate.
4. Rulare in cloud si pipeline-uri CI/CD.
5. Adaugare de metrici de performanta pentru diferite endpointuri.
