# JWT review session

In this session we look into how to use a JWT token in a small web app with an api & client side JavaScript.

Adding a token to the authorization header to all `axios` calls on the client side:

```
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
```

Read the token on the server in a middleware call like this:

```
const token = req.headers.authorization.split(" ")[1];
```



