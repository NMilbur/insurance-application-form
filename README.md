# insurance-application-form
A simple form to collect information needed to get an insurance quote

## Workflow
- A third party first posts data to the `/api/v1/application` endpoint (for testing purposes, it will be on `http://localhost:4000/api/v1/application`
- The expected data structure is below:

```
{
    "firstName": string,
    "lastName": string,
    "dateOfBirth": string (MM-DD-YYYY format),
    "street": string,
    "city": string,
    "state": string (state abbreviation),
    "zipCode": string or number (system converts to number),
    "vehicles": (must have between 1 and 3 vehicles) [
        {
            "vin": string,
            "year": string or number (system converts to number, range between 1985 and current year + 1 inclusive),
            "make": string,
            "model": string
        }
    ]
}
```
- On the initial request, only the `firstName` and `lastName` fields are required
- On a successful, you will receive a link to the frontend with a token associated with the application so that you may continue the application process
- Once you fill out the form, you can save the form and then request a quote (currently a base quote is hard-coded but multiplied by number of vehicles)

## Instructions

### Front-end setup
- cd into the `client` directory 
- run `npm install`
- run `npm run dev` to start the frontend which will be hosted on http://localhost:3000

### Back-end setup
- cd into the `server` directory
- run `npm install`
- run `npm run dev` to start the backend which will be hosted on http://localhost:4000 by default
