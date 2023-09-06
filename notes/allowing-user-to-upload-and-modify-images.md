---

### Strategy for Allowing End Users to Modify and Upload Images
#### (Stored in GitHub via Netlify Functions)

---

#### Section 1: Set Up the Frontend (React + Gatsby)

1. **Install Necessary Packages**
   - Install Axios for HTTP requests (`npm install axios`).

2. **Create File Input Field**
   - Create an HTML `<input type="file">` element to allow users to select files.

3. **Handle File Upload**
   - Implement a function `handleFileUpload` that triggers when a user selects a file.
   - Create a FormData object and append the selected file to it.
   - Make an API call to your Netlify Function (explained below).

```jsx
// Example Code
<input type="file" onChange={handleFileUpload} />

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post('/.netlify/functions/upload-image', formData);
  // Handle response…
};
```

Certainly, I'll remember that the strategy for handling images on your admin page is to use a WYSIWYG editor in conjunction with an image optimization library. When an image is uploaded, it will be intercepted and optimized before being inserted back into the editor.

The other thing you asked me to remember is your new workflow for dealing with database updates and Netlify builds. Specifically, when a user wants to make changes to the Firestore database, a form will be submitted. The save button on the form will trigger both the creation of a new document in Firestore and a new build on Netlify after a short wait. Netlify will then create new static HTML files as per Gatsby's instructions.
---

#### Section 2: Set Up the Backend (Netlify Functions)

1. **Initialize Netlify Functions**
   - Create a folder in your project root named `netlify`.
   - Inside `netlify`, create another folder named `functions`.

2. **Create Function File**
   - Inside `functions`, create a JavaScript file named `upload-image.js`.

3. **Write Function Logic**
   - Import Axios (`const axios = require('axios');`).
   - Use GitHub API to upload the image to your GitHub repository.
   
```javascript
// Example Code in upload-image.js
exports.handler = async function(event, context) {
  // ... code to upload to GitHub
};
```

4. **Environment Variables**
   - Store your GitHub token in a `.env` file or directly in your Netlify dashboard as `GITHUB_TOKEN`.

---

#### Section 3: Test Everything

1. **Unit Test Frontend**
   - Write Jest tests to make sure `handleFileUpload` is working as expected.

2. **Unit Test Backend**
   - Write Jest tests to ensure the Netlify function is communicating with GitHub API correctly.

```javascript
// Example Jest Test for Backend
test('uploads image to GitHub', async () => {
  // ... Test logic
});
```

---

#### Section 4: Development Workflow

1. **Run Netlify CLI**
   - Install the Netlify CLI (`npm install -g netlify-cli`).
   - Run `netlify dev` to simulate a Netlify environment locally.

2. **Run Gatsby Develop**
   - You can run `gatsby develop` separately, but you will primarily rely on `netlify dev` to handle both your Gatsby and Netlify functions.

---

#### Section 5: Deployment

1. **Deploy to Netlify**
   - Push your changes to your GitHub repository.
   - Trigger a build in your Netlify dashboard.

2. **Check Live Functionality**
   - After deployment, make sure everything is working as expected on the live website.

---