CREATE TABLE pizza_styles (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    img_url VARCHAR (255)
);

ALTER TABLE reviews
ADD COLUMN pizza_style_id INTEGER NOT NULL REFERENCES pizza_styles(id);
