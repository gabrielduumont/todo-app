# About this project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for the sake of simplicity. CRA is no longer recommended even by react official docs, I would usually follow the bootstrap with nextjs for new applications if nextjs is suitable for the case.

## To run this projecT

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

you can also run in production mode by running

### `npm run build`

then

### `serve -s build`

## To run Unit Tests on this project

In the project directory, you can run:

### `npm run test:ci`

## To run quality checks on the code

In the project directory, you can run:

### `npm run quality:check`

this script will run the check if code formatting is following the rules, then it will run the unit tests to ensure code quality and at last it will build the solution to check if the build is not broken. Ideally this script will run before merges to master (from pull requests), and I usually like to add husky and make it run before I push code to the origin branch 
