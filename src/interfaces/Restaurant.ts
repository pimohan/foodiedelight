/**
 * Interface representing a restaurant entity.
 */
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  operating_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  menu: [
    {
      name: string;
      description: string;
      price: number;
      category: string;
    }
  ];
}
