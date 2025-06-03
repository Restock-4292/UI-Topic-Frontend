
export class RestaurantSale {
    id: number;
    admin_restaurant_id: number;
    diner_name: string;
    total_price: number;
    date: string;
    added_inventory: boolean;

    constructor(restaurantSale: {
        id?: number,
        admin_restaurant_id?: number,
        diner_name?: string,
        total_price?: number,
        date?: string,
        added_inventory?: boolean,
    }) {
        this.id = restaurantSale.id || 0;
        this.admin_restaurant_id = restaurantSale.admin_restaurant_id || 0;
        this.diner_name = restaurantSale.diner_name || '';
        this.total_price = restaurantSale.total_price || 0;
        this.date = restaurantSale.date || '';
        this.added_inventory = restaurantSale.added_inventory || false;
    }
}
