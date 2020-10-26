/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($id: ID, $title: String) {
    onCreateTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($id: ID, $title: String) {
    onUpdateTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($id: ID, $title: String) {
    onDeleteTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;
