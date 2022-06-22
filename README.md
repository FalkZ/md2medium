# md2medium

> this command line tool converts markdown files into a github gist, that can be imported into medium.com

## Features

- automatically converts code blocks into embedded gists:
  ` ```ts ` block turns into a gist with `.ts` file ending
- remaps the headings
  - `#` => post title
  - `##` => big heading
  - `###` to `######` => small heading

## Usage
1. [Create a personal access token on github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) & select gist as option.
2. Run this command:
   ```bash 
    npx md2medium [token] [markdown file]
    ```
3. Use the url provided, to import your story into medium on https://medium.com/p/import
4. Sadly you have to press enter after each `https://gist.github.com/...` url, to display the code blocks
5. Format & publish