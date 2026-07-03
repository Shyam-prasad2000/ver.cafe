# Sanity CMS Configuration & Setup Guide

This guide walks you through setting up Sanity Headless CMS and connecting it to the **Ver.Cafe - Roots** landing page.

---

## Step 1: Initialize Your Scaffolded Sanity Studio
The Sanity Studio files and schemas have already been pre-configured for you inside the **[studio/](file:///d:/Projects/Ver%20cafe/studio/)** folder!
1. Open your terminal, change directories into the studio folder, and install the dependencies:
   ```bash
   cd studio
   npm install
   ```
2. Log in or create your Sanity account if you haven't yet:
   ```bash
   npx sanity login
   ```
3. To link this studio to your Sanity account, run:
   ```bash
   npx sanity init
   ```
   *Select **"Create new project"**, name it (e.g. `ver-cafe-roots`), and choose the dataset (default `production`). This will automatically generate your Project ID.*

---

## Step 2: Configure Schema Files
No copy-pasting needed! The schemas are already created and configured inside **[studio/schemaTypes/](file:///d:/Projects/Ver%20cafe/studio/schemaTypes/)**:
- `cafeContent.js`
- `signatureItem.js`
- `menuItem.js`
All schema exports are registered in `studio/schemaTypes/index.js`.

---

## Step 3: Input Content in Sanity Studio
1. Start the Sanity editor locally:
   ```bash
   npm run dev
   ```
2. Open the URL shown (usually `http://localhost:3333`) and log in.
3. Go to **Cafe Content** and create a document:
   - Input your Hero Title, Story description, physical address, timings, and map URL.
   - **Crucial**: Ensure you hit **Publish** in the bottom-right corner.
4. Go to **Signature Item** and create 3 documents (representing your signature products):
   - Enter name, price, description, select icon (e.g. sparkles, droplet, compass), and upload product photos.
5. Go to **Menu Item** and populate all regular menu listings (e.g., espresso, bakes, infusions), matching the categories.

---

## Step 4: Link Your Codebase
1. Get your **Project ID** from either the Sanity Studio configuration file (`sanity.config.js`) or from your Sanity Management Dashboard (at [sanity.io/manage](https://www.sanity.io/manage)).
2. Open the file [sanityClient.js](file:///d:/Projects/Ver%20cafe/src/sanityClient.js) in your website repository.
3. Replace the placeholder `'unconfigured'` with your actual Project ID:
   ```javascript
   export const sanityClient = createClient({
     projectId: 'your_actual_project_id_here', // <-- Replace this
     dataset: 'production',
     apiVersion: '2026-07-02',
     useCdn: true,
   });
   ```

---

## Step 5: Configure CORS Settings (Important)
Sanity blocks requests from unknown web hosts by default. You need to whitelist your website:
1. Go to [sanity.io/manage](https://www.sanity.io/manage) and select your project.
2. Navigate to the **API** tab.
3. Under **CORS Origins**, click **Add CORS origin**.
4. Add `http://localhost:5173` (for local development) and check **"Allow credentials"**.
5. Add your hosted production domain (e.g. `https://yourdomain.com`) and check **"Allow credentials"**.
6. Click **Save**.

---

Once completed, your website will automatically fetch and render your published Sanity CMS data, and any changes you publish in Sanity Studio will update your website instantly!
