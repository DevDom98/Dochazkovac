import * as Hapi from '@hapi/hapi';
import Client from './src/database/client';
import ProjectManager from './src/model/ProjectManager'
import ProjectRepository from './src/database/repository/ProjectRepository'
import ProjectRouter from "./src/router/ProjectRouter";
import RecordRouter from "./src/router/RecordRouter";
import RecordRepository from "./src/database/repository/RecordRepository";
import RecordManager from "./src/model/RecordManager";
import StatisticRouter from "./src/router/StatisticRouter";
import StatisticManager from "./src/model/StatisticManager";
const init = async () => {
    const db = new Client('localhost', 8889, 'dochazkovac', 'root', 'root');
    await db.connect();
    console.log('Database connected')

    const projectRepository = new ProjectRepository(db);
    const projectManager = new ProjectManager(projectRepository);
    const projectRouter = new ProjectRouter(projectManager);

    const recordRepository = new RecordRepository(db);
    const recordManager = new RecordManager(recordRepository,projectRepository)
    const recordRouter = new RecordRouter(recordManager);

    const statisticManager = new StatisticManager(recordRepository);
    const statisticRouter = new StatisticRouter(statisticManager);

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes:{
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        }
    });

    projectRouter.createRoutes(server);
    recordRouter.createRoutes(server);
    statisticRouter.createRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();