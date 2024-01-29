


WorkFlow for Login and Signup User

- Set up the Google OAuth in GCP so that you can login with the help of Google Email,
- After getting the google Oauth JWT token from the login it will then send a param(onAccess) inside the GoogleOAuth Login component
- The whole handleGoogleLogin uses useCallback so that only ounce you store the token if the email is send








Cons of Page router over App Router

 - No Server Actions in Page Router

 - Pages directory uses client side routing for components where as App router uses server Centric rendering so in Aprrouter route map dosent need to be downloaded and that just improves performane over Page Router



 Difference between _app.tsx and _document.tsx in Page router vs layout.tsx and page.tsx in app router

    -  _app.tsx is used to have global context like we do for dark mode or for state management with any state management tool like context api or redux toolkit but layout.tsx is like the scoped version of _page.tsx 

    - p