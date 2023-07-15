"use server"

import Stripe from "stripe";
import {redirect} from "next/navigation";

const apiKey = process.env.STRIPE_API_KEY ?? ""
const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

export async function redirectToPaymentLink() {
    console.log('redirectToPaymentLink')

    const paymentLink = await stripe.paymentLinks.create({
        line_items: [
            {
                price: 'price_1NTPQJGLM4u3hshryU7x5fi9',
                quantity: 2,
            },
        ],
        after_completion: {
            type: 'redirect',
            redirect: {
                url: 'http://localhost:3000',
            }
        },
        shipping_address_collection: {
            allowed_countries: ['SE'],
        },
        shipping_options: [
            {
                shipping_rate: 'shr_1NTlBaGLM4u3hshr0THYK5MW',
            },
        ],
    });
    redirect(paymentLink.url)
}