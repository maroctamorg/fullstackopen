CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO
    blogs (author, url, title, likes)
VALUES (
        'John Doe',
        'https://example.com/blog1',
        'First Blog Post',
        10
    ),
    (
        'Jane Smith',
        'https://example.com/blog2',
        'Second Blog Post',
        20
    ),
    (
        'Alice Johnson',
        'https://example.com/blog3',
        'Third Blog Post',
        5
    );

SELECT * FROM blogs;