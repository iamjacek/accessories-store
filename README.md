# Online store with phone accessories

Simply create account, add items to a basket and proceed to checkout to make a payment.
You can ammend your basket, remove or add items on the fly.
Stripe is being used to process payments.

## Stack

- react
- strapi
- stripe
- netlify
- heroku

## Backend

Strapi deployed on heroku. Images on cloudinary. MongoDB.

## Frontend

React, router, axios, tailwind, graphql, apollo

### Online acces

Store has been deployed on <https://www.beep-line.com>

### To pass throught check out:
Use card number 4242 4242 4242 4242 code: 424
To pass check out.
Order will be save in strapi, payment in stripe.

### Some features:
- Add to basket
- Buy now button, it goes right away to checkout with selected item
- Search items/categories by name or description
- Basket component let you ammend your order and check it
- Modal msg after submitting checkout. Final chance to confirm.
- Process payment with stripe and send email with receipt after purchace from custom domain.
- Images on Cloudinary (heroku keep them for one dyno cycle only)
