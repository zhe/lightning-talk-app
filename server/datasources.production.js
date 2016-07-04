module.exports = {
  prodDB: {
    host: process.env.MYSQL_PORT_3306_TCP_ADDR,
    port: process.env.MYSQL_PORT_3306_TCP_PORT,
    url: '',
    database: process.env.MYSQL_INSTANCE_NAME,
    password: process.env.MYSQL_PASSWORD,
    name: 'prodDB',
    user: process.env.MYSQL_USERNAME,
    connector: 'mysql'
  }
}
