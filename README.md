# AngularDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Features

- Fetch Data: The fetchData method retrieves a list of users from the API. The data is paginated, and the current page is determined by this.currentPage.

- Fetch Single User Data: The fetchSingleUserData method retrieves data for a single user, identified by their id.

- Go Back Button: The goBack method hides the details of a single user.

- Search bar: Filter by ID to get the information of the right id you are looking for.

## Pagination

- Next Page: The nextPage method increments the current page number and fetches the corresponding page of data, if it exists.

- Previous Page: The previousPage method decrements the current page number and fetches the corresponding page of data, if it exists.

## Usage
This component is designed to be used within an Angular application. It should be included in the declarations array of the NgModule that you want to use it in.

The component makes use of the HttpClient module to make HTTP requests, so make sure to import the HttpClientModule in your application module.

## Dependencies
Angular
HttpClient module from @angular/common/http
API
The component fetches data from https://reqres.in/api/users. Make sure this API is accessible from your application.

## Good Practices to suggest add

- Use Endpoints: When searching for a user, it's recommended to use specific endpoints. This will make your requests more efficient and easier to manage. For example, instead of fetching all users and then filtering them on the client side, you can use an endpoint like `https://reqres.in/api/users?id={$id}` to directly fetch the user with the specified name.

- Clear Search Term: To improve user experience, ensure that the search term is cleared whenever the search button is clicked. This way, users won't have to manually delete the previous search term before entering a new one.

- Error Indication: It's a good practice to handle errors and provide feedback to the user. For instance, if a user searches for an ID that is not found in the API, display a message like "User ID not found". This will improve the user experience by providing clear and immediate feedback.

Note:
This is a basic component and does not handle errors from the API. You may want to extend it to handle such cases, also units test aren't done since it was not stated.