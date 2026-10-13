# React + Vite

## Contact form setup

The Contact and Careers forms use the shared `useFormSubmit` helper and submit to
Web3Forms. Web3Forms delivers submissions to the recipient configured in its
dashboard. The Careers form uploads resumes to Cloudinary first and includes the
uploaded file URL in the email; the resume is linked, not attached as an email
attachment.

1. Create a Web3Forms access key at Web3Forms and configure the recipient email as
   `vrvora11@gmail.com` in the Web3Forms dashboard.
2. For Careers resume upload, create an unsigned upload preset in Cloudinary.
3. For local development, copy `.env.example` to `.env` and fill in:
   - `VITE_WEB3FORMS_ACCESS_KEY`: the Web3Forms access key.
   - `VITE_CLOUDINARY_CLOUD_NAME`: the Cloudinary cloud name.
   - `VITE_CLOUDINARY_UPLOAD_PRESET`: the unsigned upload preset name.
4. In Vercel, open **Project → Settings → Environment Variables**, add the same
   values for the deployment environments you use, then redeploy.

These values are used by browser-side submission and upload integrations; do not
put private SMTP credentials in `VITE_` variables. Configure the Web3Forms recipient
in the Web3Forms dashboard, not in frontend code.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and type-aware rules.
