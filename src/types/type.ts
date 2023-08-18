export type IJsonResponseCateguries =
  | {
      id: number | string;
      name: string;
    }[]
  | [];

export type validationErrorCreateForm = {
  title: string;
  content: string;
  category_id: string;
  image: string;
};

export type ListType = {
  id: number;

  price: number;

  bedrooms: number;

  bathrooms: number;

  size: number;

  streetName: string;

  houseNumber: number;

  numberAddition: number;

  zip: string;

  city: string;

  upload: string;
  constructionYear: number;

  hasGarage: boolean;

  description: number;
};

export type ListsType = ListType[];

export interface IJsonResponsePosts {
  data: ListsType;
  current_page: number;
  last_page: number;
}

export type ChildrenType = string | JSX.Element | JSX.Element[];
