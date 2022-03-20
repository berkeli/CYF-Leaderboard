import { UserModel as User } from '../entities/user';
import redis from '../utils/redis';

type getUsersFromCache = {
    q?: string,
    page: number,
    perPage: number,
    clan: string
}

const textMatch = (a:string, b:string):boolean => a?.toLowerCase().includes(b.toLowerCase())

export const getUsersFromCache = async ({q, page, perPage, clan}: getUsersFromCache) => {
    if (q) {
        const clanMembers = await redis.LRANGE(clan, 0, -1);
        const data = clanMembers.map((e:string)=> JSON.parse(e)).filter((e:any)=> textMatch(e.name, q) || textMatch(e.codewarsUsername, q))
        return {
            data,
            total: data.length
        }
    }
    const clanMembers = await redis.LRANGE(clan, page * perPage, (page + 1) * perPage-1);
    if (clanMembers.length === 0) {
        await redis.DEL(clan);
        const users = await User.find({clan}).populate({ path: 'completedKatas', populate: { path: 'id', select: 'name rank.name completedLanguages completedAt' } }).sort({ honor: -1 });
        await redis.RPUSH(clan, users.map(e => JSON.stringify(e)), 'EX', 60 * 60 * 24);
        return {
            data: users.splice(page * perPage, perPage),
            total: users.length
        }
    }
    return {
        data: clanMembers.map((e:string)=> JSON.parse(e)),
        total: await redis.LLEN(clan)
    };
}
