import * as actionTypes from '../../redux/actionsTypes';
import axiosOrders from '../../axios-orders';

export const set_orders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders
    }
};

export const fetch_orders = (auth, userId) => {
    return dispatch => {
        const queryParam = '/orders.json?auth=' + auth + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosOrders.get(queryParam)
            .then(res => {
                const queryParam2 = '/userData.json?auth=' + auth + '&orderBy="userId"&equalTo="' + userId + '"';

                let orders = [];

                for (let key in res.data) {
                    orders.push({
                        id: key,
                        ...res.data[key]
                    });
                }

                axiosOrders.get(queryParam2)
                    .then(res2 => {
                        let user;
                        let keys = [];
                        for (let key in res2.data) {
                            keys.push(key);
                        }
                        user = res2.data[keys[0]];

                        orders = orders.map(order => {
                           return {
                               ...order,
                               name: user.name,
                               address: user.address
                           }
                        });

                        dispatch(set_orders(orders));
                    });
            })
            .catch(err => {
            });
    }
};
