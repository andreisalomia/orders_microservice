# Microserviciu pentru comenzi

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
