const MangeOrderCardTable = ({ order, index }) => {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="border px-3 py-2 text-center">{index + 1}</td>

      <td className="border px-3 py-2">{order.productName}</td>
      <td className="border px-3 py-2">
        <img
          src={order.productImage}
          alt={order.productName}
          className="w-12 h-12 object-cover mx-auto rounded"
        />
      </td>
     
      <td className="border px-3 py-2">{order.quantity}</td>
      <td className="border px-3 py-2">৳{order.totalPrice}</td>
      <td className="border px-3 py-2">{order.paymentMethod}</td>
      <td className="border px-3 py-2">{order.transactionId}</td>
      <td className="border px-3 py-2">{order.senderNumber}</td>
      <td className="border px-3 py-2">{order.orderDate}</td>

      <td className="border px-3 py-2 font-semibold">
        <span className={order.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}>
          {order.status}
        </span>
      </td>

      {/* Customer Info */}
      <td className="border px-3 py-2">{order.customer.name}</td>
      <td className="border px-3 py-2">{order.customer.phone}</td>
      <td className="border px-3 py-2">{order.customer.district}</td>
      <td className="border px-3 py-2">{order.customer.thana}</td>
      <td className="border px-3 py-2">{order.customer.fullAddress}</td>
    </tr>
  );
};

export default MangeOrderCardTable;
