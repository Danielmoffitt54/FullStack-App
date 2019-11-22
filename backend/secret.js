const secrets = {
    // The URL that we use to connect to the MongoDB Atlas Cluster.
    dbUrl: 'mongodb+srv://MoffittD:<password>@cluster0-7kivy.mongodb.net/test?retryWrites=true&w=majority'
};

const getSecret = key => secrets[key];

module.exports = getSecret;