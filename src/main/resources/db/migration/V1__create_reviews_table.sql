CREATE TABLE reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR (255) NOT NULL,
    description TEXT NOT NULL,
    rating INTEGER NOT NULL,
    img_url VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

