// This is to wrap the root element of my application in a language provider.
// This will allow me to access the language context from anywhere in my application.
// This is for client-side rendering.
// gatsby-browser.js
import { wrapRootElement } from './wrapRootElement';

export { wrapRootElement };
