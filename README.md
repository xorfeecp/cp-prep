# CP Prep

A static website: open `index.html`, or deploy the whole folder.

## Put it online at cp-prep.vercel.app (about 5 minutes)

### Option A: Vercel website (no terminal)
1. Create a free account at https://vercel.com (sign in with GitHub, GitLab or e-mail).
2. Create a new GitHub repository (for example `cp-prep`) and upload everything in this folder
   (on github.com: "Add file" → "Upload files", then drag the files and the `data` folder in).
3. On Vercel: "Add New…" → "Project" → import that repository.
4. Framework preset: **Other**. Leave the build command empty. Click **Deploy**.
5. Your site gets an address like `cp-prep.vercel.app`, or `cp-prep-xxxx.vercel.app` if that name is taken.
   You can change it in Project → Settings → Domains.

### Option B: terminal
1. Install Node.js from https://nodejs.org
2. In this folder run:  `npx vercel`   (log in when asked, accept the defaults, project name: cp-prep)
3. Then:  `npx vercel --prod`

## solutions/
Tested Python and C++ solutions for all 10 regional olympiad problems (10th and 11th grade) and the warm-up problem.
Every one passes the official examples and was checked against a brute force on random tests.
