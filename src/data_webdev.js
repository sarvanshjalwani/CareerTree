export const nodes = [
  { id: "w0", text: "Web Development" },
  { id: "w1", text: "Web Foundations" },
  { id: "w2", text: "HTML" },
  { id: "w3", text: "CSS & Responsive Design" },
  { id: "w4", text: "JavaScript" },
  { id: "w5", text: "Git & Browser APIs" },
  { id: "w6", text: "React" },
  { id: "w7", text: "Backend & Data" },
  { id: "w8", text: "Testing & Deployment" },
];

export const subnodes = [
  {
    id: "w-s1", parentId: "w1", text: "How the Web Works", isSubnode: true, link: ["https://www.youtube.com/watch?v=pQN-pnXPaVg"], compiler: false,
    content: [
      "A browser requests resources from a web server using HTTP or HTTPS. The server responds with documents, styles, scripts, images, or data, and the browser renders the result.",
      "A URL identifies a resource. DNS helps find the server for a domain, while HTTP methods such as GET and POST describe the kind of request being made.",
      "Frontend code runs in the browser. Backend code runs on a server and commonly handles data, authentication, and business rules. They communicate through HTTP APIs.",
      "Developer tools in the browser help inspect page structure, styles, network requests, console messages, and performance. Learning to use them makes debugging much easier.",
    ],
    question: ["Describe what happens after entering a URL in a browser.", "Explain one difference between frontend and backend code."],
  },
  {
    id: "w-s2", parentId: "w1", text: "Editors, Terminals & Project Setup", isSubnode: true, link: ["https://www.youtube.com/watch?v=RGOj5yH7evk"], compiler: false,
    content: [
      "A web project is a collection of source files, assets, and configuration. Keep related files in a clear folder structure and use meaningful names.",
      "A code editor helps write and navigate files; a terminal runs tools and project commands. Learn to open a project folder and run commands from its root.",
      "Package managers install project dependencies and define repeatable scripts. Keep the package manifest and lockfile under version control so installations remain consistent.",
      "Start with a small page and verify each change in the browser. Read error messages and use the browser console before adding more tools.",
    ],
    question: ["What is the purpose of a project lockfile?", "Create a simple project folder containing an HTML file, stylesheet, and script."],
  },
  {
    id: "w-s3", parentId: "w2", text: "HTML Structure & Semantic Elements", isSubnode: true, link: ["https://www.youtube.com/watch?v=pQN-pnXPaVg"], compiler: false,
    content: [
      "HTML describes the structure and meaning of page content. A document usually contains a doctype, an html element, metadata in head, and visible content in body.",
      "Use semantic elements such as header, nav, main, section, article, and footer to communicate the role of content to browsers and assistive technologies.",
      "Headings form a meaningful outline. Use them in a logical order, and choose an element because of its meaning rather than its default appearance.",
      "Good structure improves accessibility, search indexing, and maintainability. CSS should control presentation without replacing meaningful HTML.",
    ],
    question: ["Build a page with header, navigation, main content, and footer.", "When should you use article instead of a generic div?"],
  },
  {
    id: "w-s4", parentId: "w2", text: "Links, Images, Lists & Tables", isSubnode: true, link: ["https://www.youtube.com/watch?v=pQN-pnXPaVg"], compiler: false,
    content: [
      "Links use the anchor element and a descriptive href. Link text should make sense out of context; avoid vague labels such as 'click here'.",
      "Images use img with useful alternative text when they convey information. Decorative images can use empty alt text so assistive technologies can skip them.",
      "Use ordered and unordered lists for grouped items. Tables are for tabular data, not for page layout; include headers that identify each row or column.",
      "Choose appropriate file formats, size images for their display, and verify that paths work when the page is served from the project.",
    ],
    question: ["Add a linked image with useful alternative text.", "Create a small table with column headers for a course schedule."],
  },
  {
    id: "w-s5", parentId: "w2", text: "Forms & Accessible Inputs", isSubnode: true, link: ["https://www.youtube.com/watch?v=pQN-pnXPaVg"], compiler: false,
    content: [
      "Forms collect user input. A label should be programmatically associated with its input so users can understand and focus the correct control.",
      "Choose input types that match the data, such as email, password, number, or date. Use required and other built-in constraints where appropriate.",
      "Group related controls with fieldset and legend. Provide clear instructions and explain validation errors next to the relevant field.",
      "Client-side validation improves usability, but a server must validate submitted data again because browser checks can be bypassed.",
    ],
    question: ["Create a sign-up form with labeled name and email fields.", "Why must the server validate form data even when HTML validation is used?"],
  },
  {
    id: "w-s6", parentId: "w3", text: "CSS Selectors, Cascade & Box Model", isSubnode: true, link: ["https://www.youtube.com/watch?v=OXGznpKZ_sA"], compiler: false,
    content: [
      "CSS rules select elements and apply declarations. Selectors can target element names, classes, IDs, attributes, and relationships between elements.",
      "The cascade resolves competing declarations using origin, importance, specificity, and source order. Prefer simple selectors and consistent component classes.",
      "Every element has a box consisting of content, padding, border, and margin. box-sizing: border-box makes declared dimensions include padding and border.",
      "Use CSS custom properties for shared colors and spacing. Keep styles organized by component or page so changes remain easy to reason about.",
    ],
    question: ["Explain the difference between padding and margin.", "Use a CSS custom property for a theme color and apply it to a heading."],
  },
  {
    id: "w-s7", parentId: "w3", text: "Flexbox & CSS Grid", isSubnode: true, link: ["https://www.youtube.com/watch?v=OXGznpKZ_sA"], compiler: false,
    content: [
      "Flexbox arranges items along one primary axis and is useful for navigation bars, toolbars, and aligned components.",
      "CSS Grid supports rows and columns together. It works well for page layouts and card collections that need consistent tracks.",
      "Use gap for spacing between layout items instead of adding margins to every child. Choose minmax and flexible units to create layouts that adapt.",
      "Neither system replaces semantic HTML. Select the layout tool that best expresses the relationships between the content items.",
    ],
    question: ["Build a responsive row of navigation links using Flexbox.", "Create a card grid that switches from three columns to one on a narrow screen."],
  },
  {
    id: "w-s8", parentId: "w3", text: "Responsive Design & Media Queries", isSubnode: true, link: ["https://www.youtube.com/watch?v=OXGznpKZ_sA"], compiler: false,
    content: [
      "Responsive design lets a page work across viewport sizes and input modes. Start with flexible layouts rather than fixed page widths.",
      "Use relative units, fluid images, and CSS Grid or Flexbox. Add breakpoints when the content layout needs to change, not for specific device models.",
      "A viewport meta tag helps mobile browsers size pages correctly. Test both narrow and wide layouts and check for horizontal overflow.",
      "Responsive interfaces should remain readable and operable with keyboard, touch, zoom, and assistive technologies.",
    ],
    question: ["Add a breakpoint that changes a two-column layout to a single column.", "How can you find and fix horizontal overflow on a small screen?"],
  },
  {
    id: "w-s9", parentId: "w3", text: "Typography, Color & Design Systems", isSubnode: true, link: ["https://www.youtube.com/watch?v=OXGznpKZ_sA"], compiler: false,
    content: [
      "A visual system defines reusable choices for color, spacing, typography, borders, and interaction states. Consistency makes a site feel cohesive.",
      "Use a clear type scale and readable line lengths. Establish sufficient contrast between text and its background.",
      "CSS variables can store design tokens, such as primary colors and spacing values, so updates remain consistent across components.",
      "Design for focus, hover, disabled, and error states as well as the default appearance. Do not rely on color alone to communicate meaning.",
    ],
    question: ["Define three CSS variables for colors and use them in a button and card.", "What should you check when choosing text and background colors?"],
  },
  {
    id: "w-s10", parentId: "w4", text: "JavaScript Basics & Data Types", isSubnode: true, link: ["https://www.youtube.com/watch?v=jS4aFq5-91M"], compiler: false,
    content: [
      "JavaScript adds behavior to web pages. Use const by default and let when a binding must be reassigned; avoid var in new code.",
      "Primitive values include strings, numbers, booleans, null, and undefined. Objects and arrays hold structured collections of values.",
      "Use comparison and logical operators to express conditions. Prefer strict equality to avoid surprising type coercion.",
      "Break logic into small functions with clear inputs and outputs. Meaningful names and consistent formatting make code easier to maintain.",
    ],
    question: ["Write a function that converts a temperature from Celsius to Fahrenheit.", "When should you use let instead of const?"],
  },
  {
    id: "w-s11", parentId: "w4", text: "Functions, Arrays & Objects", isSubnode: true, link: ["https://www.youtube.com/watch?v=jS4aFq5-91M"], compiler: false,
    content: [
      "Functions package reusable behavior. JavaScript supports declarations, expressions, and arrow functions; choose a form that makes scope and this behavior clear.",
      "Arrays are ordered collections. Methods such as map, filter, and find help express transformations without manually managing indexes.",
      "Objects group related values under keys. Destructuring and property shorthand can make data access concise while keeping intent readable.",
      "Avoid mutating shared data unexpectedly. Copy or derive values when updating state in an interface.",
    ],
    question: ["Use filter to select even numbers from an array.", "Create an object for a course and write a function that formats its title and level."],
  },
  {
    id: "w-s12", parentId: "w4", text: "DOM, Events & Form Interaction", isSubnode: true, link: ["https://www.youtube.com/watch?v=jS4aFq5-91M"], compiler: false,
    content: [
      "The Document Object Model represents a page as a tree of objects that JavaScript can inspect and update.",
      "Events represent user or browser actions. Register event listeners for clicks, submissions, and input changes, and remove listeners when they are no longer needed.",
      "Use textContent for plain text and avoid inserting untrusted strings as HTML. Validate user input before using it.",
      "For forms, listen to submit, prevent the default navigation when needed, read values, show clear feedback, and retain keyboard accessibility.",
    ],
    question: ["Add a button that updates a message in the page when clicked.", "Handle a form submit without a full page reload and show its entered value as text."],
  },
  {
    id: "w-s13", parentId: "w4", text: "Asynchronous JavaScript & Fetch", isSubnode: true, link: ["https://www.youtube.com/watch?v=jS4aFq5-91M"], compiler: false,
    content: [
      "Network requests take time, so JavaScript uses promises to represent results that may become available later.",
      "async and await let code express asynchronous steps clearly. Use try/catch to handle failures and provide a useful loading or error state.",
      "The Fetch API sends HTTP requests. Check response.ok before treating a response as successful, then parse the expected response format.",
      "Never expose private API keys in browser code. Requests that require secrets should be made by a trusted backend.",
    ],
    question: ["Fetch JSON from a public API and render a loading, success, and error state.", "Why should private API keys not be placed in frontend JavaScript?"],
  },
  {
    id: "w-s14", parentId: "w5", text: "Git, GitHub & Collaboration", isSubnode: true, link: ["https://www.youtube.com/watch?v=RGOj5yH7evk"], compiler: false,
    content: [
      "Git records project history as commits. A useful commit describes one coherent change and helps collaborators understand why it was made.",
      "Branches allow work to proceed independently. Pull requests provide a place to review changes before merging them.",
      "A .gitignore file prevents generated files, local configuration, and secrets from being added to version control.",
      "Never commit credentials. If a secret is exposed, revoke or rotate it; deleting it in a later commit does not erase it from history.",
    ],
    question: ["Create a branch, make a small change, and commit it with a descriptive message.", "Why should .env and node_modules usually be ignored?"],
  },
  {
    id: "w-s15", parentId: "w6", text: "React Components, Props & JSX", isSubnode: true, link: ["https://www.youtube.com/watch?v=bMknfKXIFA8"], compiler: false,
    content: [
      "React interfaces are composed from components. A component should have a focused responsibility and return a description of the interface.",
      "JSX lets components describe markup using JavaScript expressions. Use braces for expressions and give mapped elements stable keys.",
      "Props pass data from a parent to a child. Treat props as read-only and use explicit names to make component contracts clear.",
      "Reusable components help keep repeated interface patterns consistent and easier to update.",
    ],
    question: ["Create a reusable course card that accepts a title and description as props.", "Why do elements rendered from arrays need stable keys?"],
  },
  {
    id: "w-s16", parentId: "w6", text: "React State, Events & Effects", isSubnode: true, link: ["https://www.youtube.com/watch?v=bMknfKXIFA8"], compiler: false,
    content: [
      "State stores values that change over time and cause a component to render again when updated. Use the state setter rather than mutating state directly.",
      "Event handlers connect user actions to state updates. Keep the interface responsive by showing loading, success, and error states.",
      "Effects synchronize a component with external systems such as subscriptions or network requests. Include the values an effect uses and clean up subscriptions when needed.",
      "Do not use effects for values that can be calculated during rendering. Simpler data flow usually makes components easier to debug.",
    ],
    question: ["Build a counter using React state.", "Add an effect that loads data and handles loading and error states."],
  },
  {
    id: "w-s17", parentId: "w7", text: "Node.js & Express Fundamentals", isSubnode: true, link: ["https://www.youtube.com/watch?v=Oe421EPjeBE"], compiler: false,
    content: [
      "Node.js runs JavaScript outside the browser and is commonly used to build server-side applications and developer tools.",
      "Express is a web framework for defining routes and middleware. Routes receive requests and return responses; middleware can validate or transform requests.",
      "Keep route handlers focused, validate inputs, return appropriate status codes, and avoid sending internal error details to users.",
      "Read configuration from environment variables. Keep secrets out of source control and use separate settings for development and production.",
    ],
    question: ["Create an Express GET route that returns a JSON message.", "Why should server errors be logged privately instead of returned in full to clients?"],
  },
  {
    id: "w-s18", parentId: "w7", text: "REST APIs, SQL & Data Modeling", isSubnode: true, link: ["https://www.youtube.com/watch?v=HXV3zeQKqGY"], compiler: false,
    content: [
      "An API defines how clients and servers exchange data. REST-style APIs commonly use resources and HTTP methods such as GET, POST, PUT, PATCH, and DELETE.",
      "A relational database stores data in tables with defined columns. Primary keys identify rows, while foreign keys represent relationships between tables.",
      "Use parameterized SQL queries instead of joining untrusted input into query strings. Validate data and enforce appropriate constraints.",
      "Return only the data the client needs. Consider pagination for large collections and clear error responses for invalid or missing resources.",
    ],
    question: ["Design tables for users and courses with a relationship between them.", "Explain how parameterized queries help protect database operations."],
  },
  {
    id: "w-s19", parentId: "w8", text: "Authentication & Web Security Basics", isSubnode: true, link: ["https://www.youtube.com/watch?v=Oe421EPjeBE"], compiler: false,
    content: [
      "Authentication establishes who a user is; authorization determines what that user may do. An authenticated request should still check resource ownership and permissions.",
      "Passwords should be stored using a dedicated password-hashing algorithm, never as plain text. Verification codes and tokens need short, well-defined lifetimes.",
      "Validate input on the server, use HTTPS in production, protect secrets, and return generic authentication errors that do not reveal whether an account exists.",
      "Security is a system property. Use trusted libraries and review current security guidance rather than inventing cryptographic mechanisms.",
    ],
    question: ["Explain the difference between authentication and authorization.", "List two reasons server-side validation is necessary."],
  },
  {
    id: "w-s20", parentId: "w8", text: "Testing, Accessibility & Deployment", isSubnode: true, link: ["https://www.youtube.com/watch?v=bMknfKXIFA8"], compiler: false,
    content: [
      "Test important behavior at multiple levels: small utility functions, component interactions, and complete user journeys.",
      "Accessibility includes semantic structure, keyboard support, visible focus, labels, descriptive alternatives, and adequate contrast.",
      "A production build bundles and optimizes frontend assets. Configure the deployment host to serve the built app and route client-side URLs correctly.",
      "Before release, verify environment variables, API origins, database migrations, error handling, and responsive behavior. Monitor logs and keep dependencies maintained.",
    ],
    question: ["Write a test for a form that shows a validation error when required input is missing.", "What settings or behaviors should you check before deploying a single-page app?"],
  },
];
