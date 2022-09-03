const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'Bloc API'
        },
    },
    apis: ['./api/documentation/**/**.yml'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = function(app) {
    app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}