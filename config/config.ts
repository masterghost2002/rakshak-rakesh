const config = {
    databaseURI: process.env.DATABASE_URI || "mongodb://localhost:27017/express-mongo",
    saltSecret: process.env.SALT_SECRET || "thisIsASecret"
};
export default config;