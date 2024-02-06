const config = {
    databaseURI: process.env.DATABASE_URI || "mongodb://localhost:27017/express-mongo",
    saltSecret: process.env.SALT_SECRET || "thisIsASecret",
    jwtSecret: process.env.JWT_SECRET || "thisIsAJ",
    sessionSecret: process.env.SESSION_SECRET || "thisIsASessionSecret",
};
export default config;