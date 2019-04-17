## React & ASP.NET Core

This is my custom template for using React with ASP.NET Core. 

I start this from a basic ASP.NET Core MVC template and then add in components of a React app. I try to focus each commit to a single feature so it might be easier to learn by looking at the changes.

The reasonale and some analysis of this template is in my blog post https://www.nguyenquyhy.com/2019/04/react-asp-net-core/.

### TODO

- [X] Basic React rendering with Typescript and Webpack
- [X] Server Pre-rendering
- [X] Vendor bundle
- [X] Compile CSS with Webpack
- [X] Production bundle & publishing
  - [ ] Split chunk
- [X] Hot module replacement
  - [X] React hot loader
- [X] Devtool source map
- [ ] Tests
- [ ] CDN for common packages
- [ ] Lighthouse


### Some Considerations

- Server prerendering has it benefits but might not be suitable for your application. You might want to disable it by removing `asp-prerender-module="ClientApp/dist/main-server"` in Index.cshtml.
- This template generates & publishes .map files for production build. You might want to disable it by changing `'source-map'` in webpack.config.js to a more suitable option for your need.