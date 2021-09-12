# INTERVIEW TASK - Software Test Engineer

This test suite covers following api methods:

- GET IDs of Allegro categories
- GET a category by ID
- GET parameters supported by a category

### Getting Started
#### Prerequisites:
- node version 14.17.0
- npm version 6.14.13

#### Install dependencies:

```npm install```

#### Configuration:

Before running tests, please set below environment variables:

- ```ALLEGRO_CLIENT_ID``` - Client Id
- ```ALLEGRO_SECRET``` - Client Secret
- ```ALLEGRO_helper.API_ROOT_URL``` - eg. 'https://api.allegro.pl/'

### Running test:

```npm test```

### HTML and JSON test report

Report will be generated in:

- ./mochawesome-report/mochawesome.html
- ./mochawesome-report/mochawesome.json