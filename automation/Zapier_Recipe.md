# Zapier Automation: Stripe → Airtable → Email (Optiloves MVP)
Steps:
1) Trigger: Stripe Payment Succeeded
2) Airtable: Find Property by metadata.property_name
3) Airtable: Find/Create User by customer_email
4) Airtable: Create Investment (tokens = amount_total / (price_per_token*100))
5) Formatter: Add Tokens Sold + Tokens Purchased
6) Airtable: Update Property Tokens Sold
7) Gmail/SendGrid: Send receipt (use /emails/receipt_email.html)
