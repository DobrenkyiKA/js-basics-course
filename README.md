# JS Basics Course

## Preparations

1. Fork repository
1. Invite your mentor
    *  On your fork project page in git.epam go to **Settings** -> **Members**
    *  Find your mentor in **'GitLab member or Email address'** field
    *  Select ```maintainer``` role in **'Choose a role permission'** field
1. Clone repository to the local environment
1. Install last nodejs LTS https://nodejs.org/en/
1. Install dependencies for course project
    *  ```npm i```

## Workflow for mentee
1. Go to the module folder
1. Learn materials in README.md
1. Create a branch ```module-${moduleNumber}```. For example ```module-1```
1. Unskip tests for current module (remove .skip for module test suit). For example 
    *  ```describe.skip('Module 1', ...``` -> ```describe('Module 1', ...```
1. Complete exercises
    *  You can find exercises description in module README.md under materials section
    *  To start module exercises use command ```npm run module-${moduleNumber}```. For example ```npm run module-1``` for first module.
        *  For modules 1-5 test-runner will be started and it will watch for changes and rerun tests automatically.
        *  For modules 7,10 dev-server will be started and it will open browser page, watch for changes and rebuild application
        *  For modules 6,8,9 there is no exercises
1. Commit and push completed exercises
1. Create merge request to ```develop``` branch and assign it to mentor
1. 
