# WaitListAPI
As a developer at Dira Labs , you’re required to provide an API endpoint that helps people to join a waitlist. The waitlist would be able to accomodate two types of waitlisters:

Investors
Asset listers
Both waitlister types are required to fill in their details (full name and email address) while signing up.

However, the asset lister must provide a description of the asset they plan on listing. It should also be noted that no two waitlisters can have the same email address.

Create a backend application that exposes just a single endpoint and follows all business constraints stated in the problem statement.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/RIDUMATICS/WaitList_API.git
    - cd WaitList_API
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    createdb -h localhost -p 5432 -U postgres waitlistdb
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.

- Run `npm run dev` to start the server and watch for changes

### Testing

- Run `npm run test` to performs a single full test suite run

### API ENDPOINTS

| URI                                     | HTTP Method | Description                    |
| --------------------------------------- | ----------- | ------------------------------ |
| <code>/docs</code>.                     | `GET`       | Documentation.                 |
| <code>/api/register</code>.             | `POST`      | Add user to the waitlist       |

## Misc😏

If for some reason you find this repo useful, please give me a star🙏
