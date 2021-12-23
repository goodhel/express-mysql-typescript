## Project Init
```
npm init

```

## Inisiasi Typescript
```
1. npm i --save-dev typescript ts-node
2. npx tsc --init

```

## Express Installation
```
1. npm i --save express
2. npm i --save-dev @types/express
```

## EsLint
```
npx eslint --init

- How would you like to use ESLint?
    To check syntax, find problems, and enforce code style.
- What type of modules does your project use?
    JavaScript modules (import/export)
- Which framework does your project use?
    None of these
- Does your project use TypeScript?
    Yes
- Where does your code run?
    Node
- How would you like to define a style for your project?
    Use a popular style guide
- Which style guide do you want to follow?
    Standard
- What format do you want your config file to be in?
    JSON
- Would you like to install them now with npm?
    Yes
```

## Prettier
```
1. npm install --save-dev --save-exact prettier
2. echo {}> .prettierrc.json
3. create .prettierignore
    # Ignore artifacts:
    build
    coverage
4. npx prettier --config .prettierrc.json --write ./src/**/*.ts
```

## Husky and Lint Staged
```
1. npm install --save-dev husky lint-staged
2. npx husky install
3. npm set-script prepare "husky install"
4. npx husky add .husky/pre-commit "npx lint-staged"
```