import { useEffect, useState } from "react";
import axios from "axios";
import endPoints from "@services/api";

const OrderStatistics = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrders() {
          const response = await axios.get(endPoints.orders.getAllOrders);
          setOrders(response.data);
        }
        try {
          getOrders();
        } catch (error) {
          console.log(error);
        }
      }, []);

    return (
        <>
            <div>
                <h4>Productos mas pedidos</h4>
                
            </div>
        </>
    );
}

export default OrderStatistics;