import axios from "axios";

// export default axios.create({
//     baseURL: 'http://localhost:3005'
// });

const server = axios.create({
  baseURL: "http://localhost:5000",
});

// process.env.REACT_APP_LOCALHOST_RESTFUL

export { server };
