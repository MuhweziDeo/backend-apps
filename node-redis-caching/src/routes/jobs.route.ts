import {Router} from 'express';
import JobController from '../controllers/jobs.controller';
import Route from "../interfaces/routes.interface";

class JobsRoute implements Route {
    public router = Router();
    public path = '/jobs';
    public controller = new JobController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes () {
        this.router.get(`${this.path}/github`, this.controller.searchGitHubJobs);
    }
}

export default JobsRoute;