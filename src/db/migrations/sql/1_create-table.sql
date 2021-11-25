DROP TYPE IF EXISTS deck_types CASCADE;
DROP TABLE IF EXISTS deck CASCADE;
DROP TABLE IF EXISTS card CASCADE;
-- DROP TABLE IF EXISTS migrations;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE deck_types AS ENUM (
  'FULL', 'SHORT'
);

CREATE TABLE deck(
  deck_id UUID PRIMARY KEY,
  deck_type deck_types,
  shuffled BOOLEAN,
  remaining INT
);

CREATE TABLE card(
  card_id UUID PRIMARY KEY,
  deck_id UUID CONSTRAINT fk_deckId REFERENCES deck(deck_id),
  card_value VARCHAR(256),
  suite VARCHAR(15),
  code VARCHAR(15),
  iswithdrawn BOOLEAN
);
