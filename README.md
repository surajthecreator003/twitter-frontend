

Cons of Page router over App Router

 - No Server Actions in Page Router

 - Pages directory uses client side routing for components where as App router uses server Centric rendering so in Aprrouter route map dosent need to be downloaded and that just improves performane over Page Router



 Difference between _app.tsx and _document.tsx in Page router vs layout.tsx and page.tsx in app router

    -  _app.tsx is used to have global context like we do for dark mode or for state management with any state management tool like context api or redux toolkit but layout.tsx is like the scoped version of _page.tsx 

    - p