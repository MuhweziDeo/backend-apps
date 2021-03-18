import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import redis from '../cache/redis';


class JobController {
    public jobsKey = 'github_jobs'
    public searchGitHubJobs = async(req: Request, res: Response, next: NextFunction) => {
        const gitHubUrl ='https://jobs.github.com/positions.json';
        try {
            const search = req.query.search;
            const cached = search ? await redis.getItems(search) as string | null : await redis.getItems(this.jobsKey) as string | null;
            if(cached) {
                const r = JSON.parse(cached);
                return res.json({data: r});
            }
            const {data} = search ? await axios.get(`${gitHubUrl}?search=${search}`) : await axios.get(gitHubUrl);
            await redis.saveItems(search ? search : this.jobsKey,data);
            return res.json({data: data});
        } catch (error) {
            console.log(error.response.data);
            next(error)
        }
        
        // const d = await fetch() 
    }
}

export default JobController;