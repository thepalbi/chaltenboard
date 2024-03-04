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
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    map_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_modified TIMESTAMP NOT NULL,
    FOREIGN KEY (map_id) REFERENCES maps(map_id)
);

-- insert test markers into db
INSERT INTO markers (lat, lng, map_id, created_at, last_modified)
VALUES
    (29.8283, -96.5796, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (39.8283, -98.5795, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);