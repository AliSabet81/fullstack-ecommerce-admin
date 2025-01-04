import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedOrders: OrderColumn[] = orders.map((item) => {
    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
        .map((orderItem) => orderItem.product.name + ` (${orderItem.quantity})`)
        .join(", "),
      totalPrice: formatter.format(
        item.orderItems.reduce((total, item) => {
          return total + Number(item.product.price) * item.quantity;
        }, 0)
      ),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
