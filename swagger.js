const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Full CRUD API for managing contacts',
  },
  // host: 'localhost:3000',
  host: 'contact-api-2il0.onrender.com',
  schemes: ['https'],
  basePath: '/api',
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
