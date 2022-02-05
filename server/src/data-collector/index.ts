/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import axios from 'axios';
import { KataModel as Kata, Kata as KataClass } from '../entities/kata';
import { CompleteKataClass, User as UserClass, UserModel as User } from '../entities/user';

export const fetchKataInfo = async (kataIds: string[]):Promise<object[]> => {
  const existingKatasDB: KataClass[] = await Kata.find({ id: { $in: kataIds } }).select('_id');
  const existingKatas: string[] = existingKatasDB.map((e:KataClass) => e._id.toString());
  const bulkWriteRequest:object[] = [];
  kataIds.filter((e) => !existingKatas.includes(e)).forEach(async (e) => {
    axios(`https://www.codewars.com/api/v1/code-challenges/${e}`).then((res) => {
      const getKata = { ...res.data, _id: res.data.id };
      if (res.data) {
        bulkWriteRequest.push({ updateOne: { filter: { _id: getKata._id },
          update: getKata,
          upsert: true } })
      }
    }).catch((error) => {
      console.log('Error', error.toJSON());
    });
  });
  return bulkWriteRequest;
};

export default async (username:string):Promise<UserClass> => {
  const userReq = await axios(`https://www.codewars.com/api/v1/users/${username}`);
  const userData = { ...userReq.data, codewarsUsername: userReq.data.username };
  userData.completedKatas = [];
  let currentPage = 0;
  let totalPages = 0;
  do {
    const completeKatasReq = await axios(`https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${currentPage}`);
    userData.completedKatas.push(...completeKatasReq.data.data);
    totalPages = completeKatasReq.data.TotalPages - 1;
    currentPage++;
  } while (totalPages > currentPage)

  const katasToFetch = userData.completedKatas.map((e: CompleteKataClass) => e.id);

  try {
    Kata.bulkWrite(await fetchKataInfo(katasToFetch), { ordered: false });
  } catch (e) {
    console.log(e);
  }
  const result = await User.findOneAndUpdate({ codewarsUsername: userData.codewarsUsername }, userData, { new: true, upsert: true });
  return result
}
