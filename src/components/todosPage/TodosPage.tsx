import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  Route,
  RouteComponentProps,
} from 'react-router';
import {
  TodoDetailRouteParams,
  todoDetailRoutePath,
} from '../../utils/routing';
import { Header } from '../generic/Header';
import { TodoDetail } from './TodoDetail';
import { TodoListing } from './TodoListing';
import { TodosContextManager } from './TodosContextManager';

export const TodosPage: React.FC = () => {
  return (
    <>
      <Header title="Not by far ideal todo list" />
      <TodosContextManager>
        <Container>
          <Row>
            <Col sm={4}>
              <TodoListing />
            </Col>
            <Col sm={8}>
              <Route
                path={todoDetailRoutePath}
                render={({ match }: RouteComponentProps<TodoDetailRouteParams>) => (
                  <TodoDetail id={match.params.id} />
                )}
              />
            </Col>
          </Row>
        </Container>
      </TodosContextManager>
    </>
  );
};
