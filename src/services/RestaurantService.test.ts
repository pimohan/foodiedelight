import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { RestaurantService } from "./RestaurantService";
import { Restaurant } from "../interfaces/Restaurant";
import { getBaseUrl } from "../utils/ConfigUtil";

jest.mock("../utils/ConfigUtil");

describe("RestaurantService", () => {
  let mock: MockAdapter;
  let service: RestaurantService;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    (getBaseUrl as jest.Mock).mockReturnValue("http://localhost:5001");
    service = new RestaurantService();
  });

  afterEach(() => {
    mock.reset();
  });

  test("should fetch restaurants with pagination", async () => {
    const page = 1;
    const size = 10;
    const mockData = [{ id: 1, name: "Restaurant 1" }];
    mock
      .onGet(`http://localhost:5001/restaurants?_start=0&_end=10`)
      .reply(200, mockData);

    const response = await service.getRestaurants(page, size);

    expect(response.data).toEqual(mockData);
  });

  test("should fetch restaurants without pagination", async () => {
    const page = 1;
    const mockData = [
      {
        id: "1",
        name: "Test Name",
        category: "Indian",
        contact: {
          phone: "1234567890",
          email: "test@test.com",
          website: "https://www.test.com",
        },
        description: "Test Name",
        location: "Chennai",
        menu: [
          {
            name: "Menu 1",
            price: 100,
            category: "Indian",
            description: "Menu 1",
          },
        ],
        operating_hours: {
          monday: "09:00 AM - 09:00 PM",
          tuesday: "09:00 AM - 09:00 PM",
          wednesday: "09:00 AM - 09:00 PM",
          thursday: "09:00 AM - 09:00 PM",
          friday: "09:00 AM - 09:00 PM",
          saturday: "09:00 AM - 09:00 PM",
          sunday: "09:00 AM - 09:00 PM",
        },
      },
    ];
    mock
      .onGet(`http://localhost:5001/restaurants?_page=1`)
      .reply(200, mockData);

    const response = await service.getRestaurants(page);

    expect(response.data).toEqual(mockData);
  });

  test("should fetch restaurant by ID", async () => {
    const restaurantId = "1";
    const mockData: Restaurant = {
      id: "1",
      name: "Test Name",
      category: "Indian",
      contact: {
        phone: "1234567890",
        email: "test@test.com",
        website: "https://www.test.com",
      },
      description: "Test Name",
      location: "Chennai",
      menu: [
        {
          name: "Menu 1",
          price: 100,
          category: "Indian",
          description: "Menu 1",
        },
      ],
      operating_hours: {
        monday: "09:00 AM - 09:00 PM",
        tuesday: "09:00 AM - 09:00 PM",
        wednesday: "09:00 AM - 09:00 PM",
        thursday: "09:00 AM - 09:00 PM",
        friday: "09:00 AM - 09:00 PM",
        saturday: "09:00 AM - 09:00 PM",
        sunday: "09:00 AM - 09:00 PM",
      },
    };
    mock
      .onGet(`http://localhost:5001/restaurants/${restaurantId}`)
      .reply(200, mockData);

    const response = await service.getRestaurantById(restaurantId);

    expect(response.data).toEqual(mockData);
  });

  test("should add a new restaurant", async () => {
    const newRestaurant: Restaurant = {
      id: "1",
      name: "Test Name",
      category: "Indian",
      contact: {
        phone: "1234567890",
        email: "test@test.com",
        website: "https://www.test.com",
      },
      description: "Test Name",
      location: "Chennai",
      menu: [
        {
          name: "Menu 1",
          price: 100,
          category: "Indian",
          description: "Menu 1",
        },
      ],
      operating_hours: {
        monday: "09:00 AM - 09:00 PM",
        tuesday: "09:00 AM - 09:00 PM",
        wednesday: "09:00 AM - 09:00 PM",
        thursday: "09:00 AM - 09:00 PM",
        friday: "09:00 AM - 09:00 PM",
        saturday: "09:00 AM - 09:00 PM",
        sunday: "09:00 AM - 09:00 PM",
      },
    };
    mock.onPost(`http://localhost:5001/restaurants`).reply(201, newRestaurant);

    const response = await service.addRestaurant(newRestaurant);

    expect(response.data).toEqual(newRestaurant);
  });

  test("should update a restaurant", async () => {
    const restaurantId = "1";
    const updateRestaurant: Restaurant = {
      id: "1",
      name: "Test Name",
      category: "Indian",
      contact: {
        phone: "1234567890",
        email: "test@test.com",
        website: "https://www.test.com",
      },
      description: "Test Name",
      location: "Chennai",
      menu: [
        {
          name: "Menu 1",
          price: 100,
          category: "Indian",
          description: "Menu 1",
        },
      ],
      operating_hours: {
        monday: "09:00 AM - 09:00 PM",
        tuesday: "09:00 AM - 09:00 PM",
        wednesday: "09:00 AM - 09:00 PM",
        thursday: "09:00 AM - 09:00 PM",
        friday: "09:00 AM - 09:00 PM",
        saturday: "09:00 AM - 09:00 PM",
        sunday: "09:00 AM - 09:00 PM",
      },
    };
    mock
      .onPut(`http://localhost:5001/restaurants/${restaurantId}`)
      .reply(200, updateRestaurant);

    const response = await service.udpateRestaurant(
      restaurantId,
      updateRestaurant
    );

    expect(response.data).toEqual(updateRestaurant);
  });

  test("should partially update a restaurant", async () => {
    const restaurantId = "1";
    const updateRestaurant = { name: "Partially Updated Restaurant" };
    mock
      .onPatch(`http://localhost:5001/restaurants/${restaurantId}`)
      .reply(200, updateRestaurant);

    const response = await service.udpateRestaurantPartial(
      restaurantId,
      updateRestaurant
    );

    expect(response.data).toEqual(updateRestaurant);
  });

  test("should delete a restaurant", async () => {
    const restaurantId = "1";
    mock
      .onDelete(`http://localhost:5001/restaurants/${restaurantId}`)
      .reply(200);

    const response = await service.deleteRestaurant(restaurantId);

    expect(response.status).toBe(200);
  });
});
