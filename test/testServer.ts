import http from 'http';
import Logger from '../src/config/winston';
import app from '../src/loader';

const testServer = http.createServer(app);

const PORT = 12345;

// using different port for test
testServer.listen(PORT, () => Logger.info(`Test running on port: ${PORT}`));

export default testServer;
