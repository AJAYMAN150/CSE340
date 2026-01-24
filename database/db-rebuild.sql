DROP TYPE IF EXISTS account_type CASCADE;

CREATE TYPE account_type AS ENUM (
  'Client',
  'Employee',
  'Admin'
);
