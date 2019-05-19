// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($email: AWSEmail!) {
  getUser(email: $email) {
    email
    name
    phone
    type
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: TableUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      email
      name
      phone
      type
    }
    nextToken
  }
}
`;
export const getDish = `query GetDish($id: ID!, $cookId: ID!) {
  getDish(id: $id, cookId: $cookId) {
    id
    cookId
    spice
    order
    foodType
    status
    price
    description
    content
    images
    name
  }
}
`;
export const listDishes = `query ListDishes(
  $filter: TableDishFilterInput
  $limit: Int
  $nextToken: String
) {
  listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      cookId
      price
      description
      content
      images
      name
    }
    nextToken
  }
}
`;
