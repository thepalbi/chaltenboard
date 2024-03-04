CREATE TABLE IF NOT EXISTS maps (
    map_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_modified TIMESTAMP NOT NULL
);

-- insert test maps into db
INSERT INTO maps (name, created_at, last_modified)
VALUES
    ('chalten 2024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('champaqui con ana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS markers (
    marker_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    map_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_modified TIMESTAMP NOT NULL,
    FOREIGN KEY (map_id) REFERENCES maps(map_id)
);

-- insert test markers into db
INSERT INTO markers (name, lat, lng, map_id, created_at, last_modified)
VALUES
    ('laguna tempanos', -49.41005, -73.0083, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('laguna sucia', -49.31483, -72.9416, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('pueblo', -49.4332, -72.8822, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);