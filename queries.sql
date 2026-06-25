CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);