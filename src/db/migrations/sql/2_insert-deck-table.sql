INSERT INTO deck(
  deck_id,
  deck_type,
  shuffled,
  remaining
) VALUES (uuid_generate_v4(), 'FULL', TRUE, 52);

