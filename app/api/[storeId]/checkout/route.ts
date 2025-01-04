import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Products are required", { status: 400 });
  }

  const productIds = products.map(
    (product: { id: string; quantity: number }) => product.id
  );

  const dbProducts = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product: { id: string; quantity: number }) => {
    const dbProduct = dbProducts.find((p) => p.id === product.id);

    if (!dbProduct) {
      throw new Error(`Product with ID ${product.id} not found`);
    }

    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: dbProduct.name,
        },
        unit_amount: dbProduct.price.toNumber() * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: products.map((product: { id: string; quantity: number }) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: product.quantity,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
