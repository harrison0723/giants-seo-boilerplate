<p align="center">
  <img width="460" height="300" src="https://cdn-images-1.medium.com/max/800/1*grVJDnpHQsEC-q1MfewTVQ.png">
</p>
<p align="center">
  <i></i>
</p>


# Giants Universal Boilerplate
>If I have seen further than others, it is by standing upon the shoulders of giants.  **- Issac Newton**

* About Giants: https://medium.com/@harrison0723/giants-boilerplate-86f9f03ab4e2
* Live demo: https://giants-seo-boilerplate.appspot.com/

## Features
1. **No server code**: Giants Universal uses Google’s [Cloud Firestore](https://firebase.google.com/docs/firestore/) for backend.
2. **No redux code**: Giants Universal integrates with [redux-firestore](https://github.com/prescottprue/redux-firestore) and [redux-form](https://github.com/erikras/redux-form).
3. **No build config**: Giants Universal is based on Facebook’s [create-react-app](https://github.com/facebook/create-react-app).
4. **No grunt work**: Giants Universal has auth, loading, error state all covered.
5. **Minimum UI code**: Giants Universal uses Alibaba’s [Ant Design for React](https://ant.design/docs/react/introduce).
6. **Scalable**: Giants Universal implements code-splitting by [react-loadable](https://github.com/jamiebuilds/react-loadable).
7. **Maintainable**: Giants Universal has a shallow, component-like file structure.
8. **SEO Support**: Giants Universal is server-side rendered with [react-frontload](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e).

## Shut up, show me the app
Clone the repository
```
git clone https://github.com/harrison0723/giants-universal-boilerplate
```
Install dependencies
```
yarn
```
Build for development (non-SSR)
```
yarn dev
```
Build for production
```
yarn build
```
Serve 
```
yarn start
```
Test
```
yarn test
```
## Customization
### Backend
1. Go to your [Firebase console](https://console.firebase.google.com/) and create an app
2. Enable authentication (Email) and Firestore database
3. Replace Firebase config in `src/firebase.js`
### Styles
1. Always give your container component a className
2. Properly scope your styles with `.containerClassName .yourClassName`
3. Override Ant Design components with `.yourClassName.antdClassName`
### Forms
Use the `render()` function in `/common/tools` to pass Ant Design fields into `redux-form` 
### Architecture
Giants boilerplate sorts files by feature rather than by type. Every new feature employs a folder in `/src` with a local architecture as follows:
```
/feature
|--/components
|--actions.js
|--feature.css
|--feature.js
|--feature.spec.js
```
_Note: the `/components` folder stores all presentational components for the feature._
## Deploy
Remember to build
```
yarn build
```
Deploy to [Google App Engine](https://cloud.google.com/appengine/)
```
yarn deploy
```

## Credits
_The Moai icon was created by Mr. Bozo from thenounproject.com._

## Mobile
Complement your public web app with mobile apps using [Giants Mobile Boilerplate](https://github.com/harrison0723/giants-mobile-boilerplate).

## Alternative
If you don't need SEO support, consider using the simpler [Giants Boilerplate](https://github.com/harrison0723/giants-boilerplate).
