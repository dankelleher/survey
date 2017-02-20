CREATE TABLE survey (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE survey_element (
    id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE survey_response (
    response_id SERIAL NOT NULL,
    survey_element_id INT NOT NULL,
    rank INT NOT NULL,
    PRIMARY KEY (response_id, survey_element_id),
    UNIQUE (response_id, survey_element_id, rank)
);