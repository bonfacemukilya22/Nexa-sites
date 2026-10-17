# NexaMarket (prototype)
Run: `python3 -m http.server 8000` in this folder, then open
- User site: http://localhost:8000/
- Admin panel: http://localhost:8000/admin/  (default login admin@nexamarket.com / admin123 — change it)

Prototype state lives in browser localStorage, so user and admin share data only on the same browser/origin.

## Replace before going live
1. `assets/common.js` – swap the localStorage DB/auth for a real backend (hashed passwords, JWT/sessions, database).
2. Prices – the simulated feed in index.html (`P`, `H`) should come from a real market-data/broker API; orders must execute server-side.
3. Payments – M-Pesa: Safaricom Daraja STK Push + callback; Cards: Stripe/Flutterwave/Paystack; Crypto: a payment processor or per-user deposit addresses with confirmations. Never handle card data directly.
4. AI scanner / support – call an LLM or your own model from the server (`aiReply` in index.html). The scanner only reports volatility/momentum; no fixed win rate is promised.
5. Compliance – real-money trading needs licensing, KYC/AML and risk disclosures in your jurisdictions.
