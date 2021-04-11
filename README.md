## Live Preview

[https://weather-app-onur-kilic.netlify.app/](https://weather-app-onur-kilic.netlify.app/)

## Notes

- The project is a weather app, which shows the weather info for Ankara, Turkey.


- It is bootstrapped with [Create React App](https://github.com/facebook/create-react-app)


- For state management, [Context API](https://tr.reactjs.org/docs/context.html) is preferred, rather than [Redux](https://redux.js.org/). I find it more readable and free from redundant complexity.
Also, it helps keeping the bundle size smaller, because of eliminating the need for any extra dependency package.


- For UI, [Material-UI](https://material-ui.com/) is used whenever possible. Additionaly, two main packages are used to develop necessary UI capabilities. Those are [Recharts](https://recharts.org/) and [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel).


- The app is responsive to any device.
