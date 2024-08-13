import axios from "axios";
import { getBaseUrl } from "../utils/ConfigUtil";
import { Restaurant } from "../interfaces/Restaurant";

export class RestaurantService {
  baseUrl = getBaseUrl();

  async getRestaurants(page: number, size: number = -1) {
    if (size === -1) {
      return await axios.get(`${this.baseUrl}/restaurants?_page=${page}`);
    } else {
      return await axios.get(
        `${this.baseUrl}/restaurants?_start=${(page - 1) * size}&_end=${
          page * size
        }`
      );
    }
  }

  async getRestaurantById(restaurantId: string) {
    return await axios.get<Restaurant>(
      `${this.baseUrl}/restaurants/${restaurantId}`
    );
  }

  async addRestaurant(newRestaurant: Restaurant) {
    return await axios.post(`${this.baseUrl}/restaurants`, newRestaurant);
  }

  async udpateRestaurant(restaurantId: string, updateRestaurant: Restaurant) {
    return await axios.put(
      `${this.baseUrl}/restaurants/${restaurantId}`,
      updateRestaurant
    );
  }

  async udpateRestaurantPartial(
    restaurantId: string | undefined,
    updateRestaurant: any
  ) {
    return await axios.patch<Restaurant>(
      `${this.baseUrl}/restaurants/${restaurantId}`,
      updateRestaurant
    );
  }

  async deleteRestaurant(restaurantId: string) {
    return await axios.delete<Restaurant>(
      `${this.baseUrl}/restaurants/${restaurantId}`
    );
  }
}
