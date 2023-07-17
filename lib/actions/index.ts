"use server"

import Stripe from "stripe";
import {redirect} from "next/navigation";
import {CartItem} from "@/lib/types";

const apiKey = process.env.STRIPE_API_KEY ?? ""
const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

export async function redirectToPaymentLink(items: CartItem[]) {
    console.log('redirectToPaymentLink')

    const paymentLink = await stripe.paymentLinks.create({
        line_items: items.map((item) => ({
            price: item.price.id,
            quantity: item.quantity,
        })),
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