Today is Tues Sept 5, and here is my new plan for what to do next:
### New Workflow for Data and Builds

1. **Data Structure in Firestore**: Store your data in Firestore with a flexible structure that allows for multiple sections, each having a `type`, `content`, and any other properties like `styling`. This would allow you to change the content, its order, and its styling dynamically.

    Example data structure:

    ```json
    "en": {
      "sections": [
        {
          "type": "heading",
          "headingLevel": "h2",
          "content": "Section 1 Title"
        },
        {
          "type": "paragraph",
          "content": "Section 1 Content",
          "styling": "centered, italic, bold"
        },
        // ...
      ]
    }
    ```

2. **Gatsby Build Process**: Utilize Gatsby's build process to generate static HTML files for each page. When your Firestore database changes, you can trigger a new build on Netlify, which then fetches the latest data from Firestore and generates new static HTML files.

3. **Netlify Automated Builds**: Set up Netlify to listen for changes in your Firestore database to trigger automated builds. Netlify's build hooks can help with this. Netlify is a paid service beyond a certain number of builds.

### Custom Editor for Admins

1. **Editor UI**: Build a custom editor UI that allows the admin to create, edit, and delete different sections for each page. This ensures you have better control over the user interface and data integrity, especially when dealing with bilingual content. You can lay out sections side by side for different languages.

2. **Styling**: Use predefined styles and classes that the admin can apply to each section, offering a simpler but still powerful way to style the content.

### Image Handling

1. **Image Optimization**: Use a third-party image optimization library to handle images. When an image is uploaded in the editor, it's processed by this service before being inserted back into the editor. This ensures optimized images without manual user intervention.

### Step-by-step Actions

1. Update your Firestore database schema to adapt to the new flexible structure.
  
2. Implement the custom admin editor following the agreed design. Utilize React for the UI elements and Firestore for CRUD operations.

3. Implement image optimization in the editor using a third-party library.

4. Modify your Gatsby build process to fetch data from Firestore and generate static HTML based on the new schema.

5. Set up Netlify automated builds. Research the documentation to see how to trigger builds when Firestore data changes.

6. Test everything thoroughly, including the editor UI, image optimization, and automated build process.

Remember, the sequence could be:
1. First, adapt your Firestore schema and Gatsby build process to work with the new data structure.
2. Then build your custom admin editor and integrate image optimization.

This encapsulates most of what we discussed and agreed upon. Feel free to refer back to this summary as you work on implementing these features.


1.  Create styling for the current /login page
2.  Write code that will allow the logged in user to modify text in the page without modifying the document fields
3.  Include a text editor so that the user can more easily modify the text
4.  Style the text-changing page
5.  test the text-changing page
6.  decide if I want to allow the user to modify the document fields and how that would work.
7.  create the ability for the user to modify the images being displayed.  (see allowing-user-to-upload-and-modify-images.md notes)
8.  test the modifications and the image changes
9.  get back to making the rest of the site
10. footer
11. header
12. the rest of the pages

