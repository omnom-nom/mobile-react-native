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
