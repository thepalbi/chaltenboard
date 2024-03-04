CREATE TABLE IF NOT EXISTS maps (
    map_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_modified TIMESTAMP NOT NULL
);

INSERT INTO maps (name, created_at, last_modified)
VALUES
    ('chalten 2024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('champaqui con ana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);