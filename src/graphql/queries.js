// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDish = `query GetDish($cookId: ID!, $id: ID!) {
  getDish(cookId: $cookId, id: $id) {
    content
    cookId
    description
    foodType
    id
    images
    name
    time
    price
    spice
    status
  }
}
`;
export const getUser = `query GetUser($email: AWSEmail!) {
  getUser(email: $email) {
    email
    name
    phone
    type
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
      content
      cookId
      description
      id
      images
      name
      time
      price
    }
    nextToken
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
