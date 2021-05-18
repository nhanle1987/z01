# Z01 - 3 nodes transition game
Z01 is just a simple web game to demonstrate how to build both the backend-side and frontend-side, connect them, and write/run the test (unit test, API test, and e2e test).

## Features
- AIO app: We build an application that can serve both backend and frontend. You just need to launch the server to immediately access the application.
- Built-in test.
- All of the logic will be returned from the backend-side (Restful-API).
- Magic layout for desktop, tablet, and mobile.

## Tech
- [ExpressJs]: of course, it is here for the backend.
- [AnimeJs]: make some magic visualize for the frontend.
- [Jest] + [Puppeteer]: for automation test our application.
 
#Installation

Z01 requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the development.

```sh
cd <project directory>
npm i
npm run dev
```
... and for production:

```sh
npm start
```
Then you can access the app by access
```sh
localhost:3000
```

You can run the test by.
```sh
npm test
```
>**Note:** please run the server (can be dev or prod) before you run your test.

>**Note:** report is generated automatically and stored in <project's root directory>/test-report.html, and the screenshot in <project's root directory>/report-e2e-images
## Test Plan
### 1 Scope
#### 1.1 In Scope
- Unit test: based on the [A.C](https://github.com/silenteer/screening) - "Engine rule" section, and some happiest cases. All of the main functions at the backend side will be tested with unit test.
- API test: based on the [A.C](https://github.com/silenteer/screening) - "Engine rule" section, and some happiest cases.
- E2E test: based on the [A.C](https://github.com/silenteer/screening) - "Engine rule" section, and some happiest cases.
#### 1.2 Out of Scope
- The responsive UI will be tested manually.
- Website Security and Performance
### 2 Quality Objective
- Ensure the application runs according to what is described in [A.C](https://github.com/silenteer/screening) - "Engine rule" section.
- Reduce application testing costs.
- Bugs/issues are identified and fixed before the app goes live.
### 3 Test Environment
- Google Chrome 90+
- Microsoft Edge
- Windows 8 and above
### 4 Test Completeness
- Run rate is mandatory to be 100% unless a clear reason is given.
- The pass rate is 80%.
### 5 Test Deliverables
- Document/Report is generated automatically (<project’s root directory>/test-report.html, <project’s root directory>/report-e2e-images)
