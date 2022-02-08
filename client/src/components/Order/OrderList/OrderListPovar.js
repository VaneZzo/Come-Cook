import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/ordersAction';
// import OrderItem from '../OrderItem/OrderItem';
import OrderItemPovar from '../OrderItem/OrderItemPovar';

const OrderListPovar = () => {
  const allOrders = useSelector(state => state.orders);
  console.log('orderlist --->', allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders())
  }, [])


  return (

    <div className="profile__list">
      {
        allOrders.map((item, index) => <OrderItemPovar
          key={item.id}
          id={item.id}
          index={index}
          date={item.date}
          address={item.address}
          title={item.title}
          text={item.text}
          numOfPeople={item.numOfPeople}
          price={item.price}
          status={item.status}
          nameClient={item.Client.name}
          emailClient={item.Client.email}
          avatar={item.avatar}
        />)
      }
    </div>
  );
}

export default OrderListPovar



// export default function OrderList() {

//   const allOrders = useSelector(state => state.orders);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getOrders())
//   }, [])

//   return (
//     <ul>
//       {allOrders.map(el => <OrderItem key={el.id} date={el.date} address={el.address} title={el.title} text={el.text} numOfPeople={el.numOfPeople} price={el.price} status_id={el.status_id} povar_id={el.povar_id} client_id={el.client_id} /> )}
//     </ul>
//   );
// }