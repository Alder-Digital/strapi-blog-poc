# Welcome to the Strapi-PoC

## Setup Strapi

1. clone the project

`git clone git@github.com:Alder-Digital/strapi-blog-poc.git`

2. Switch to correct node version [^1]

`nvm use 20.10.0` // anything 20+ should be fine

3. Install Strapi

`cd backend && yarn install` // you may use npm, pnpm or whatever you please.

4. Copy the .env.example to .env and set any random strings on the missing keys.

`cp .env.example .env`

5. Import strapi example export.

`yarn strapi import -f my-strapi-export.tar.gz.enc`

6. Enter your decryption key, hit [ENTER]. Hint: it's your company's name lowercase. We couldn't omit the encryption key but we regard all content as public 🤷🏻‍♂️.

7. Proceed: `y`, hit [ENTER]

8. Start up project

`yarn develop`

9. Visit [http://localhost:1337/admin/auth/register-admin](http://localhost:1337/admin/auth/register-admin) and create the admin user. The admin user isn't backed up.

10. Create a public facing API key for the frontend with `unlimited` token duration and token-type `readonly`. The settings below are granular but you should be OK with the readonly defaults. [http://localhost:1337/admin/settings/api-tokens?sort=name:ASC](http://localhost:1337/admin/settings/api-tokens?sort=name:ASC)

‼️ Be sure to save this for later as it is only shown once. (Step 4 frontend)

## Setup frontend

1. Open a separate terminal window and go to the strapi-blog-poc folder.

2. Go to the frontend folder and install dependencies

`cd ./frontend && nvm use 20.10.0 && yarn install`

3. Set .env file

`cp .env.example .env.local`

4. Set the `NEXT_PUBLIC_STRAPI_API_TOKEN` from step 8. here

5. Startup the frontend
   `yarn dev`

### Sidenotes

- If you have any questions or comments, leave us a note on github and reference the part of the code you're interested in.

[^1]: [This bash script](https://stackoverflow.com/questions/29653036/automatically-switch-to-correct-version-of-node-based-on-project#answer-57779249) is great for turning on auto-switching to the correct node version.
