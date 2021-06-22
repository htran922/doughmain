CREATE TABLE reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR (255) NOT NULL,
    comment TEXT,
    rating INTEGER NOT NULL,
    img_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

