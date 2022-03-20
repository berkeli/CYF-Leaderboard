/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import axios from 'axios';
import { User as UserClass, UserModel as User } from '../entities/user';

export const fetchKataInfo = async (kataIds: (string | undefined)[]):Promise<object[]> => {
  const bulkWriteRequest:object[] = [];
  for (let i = 0; i < kataIds.length; i++) {
    await axios(`https://www.codewars.com/api/v1/code-challenges/${kataIds[i]}`).then((res) => {
      const getKata = { ...res.data, _id: res.data.id };
      if (res.data) {
        bulkWriteRequest.push({ updateOne: { filter: { _id: getKata._id },
          update: getKata,
          upsert: true } })
      }
    }).catch((error) => {
      console.log(error.message)
    });
  }
  return bulkWriteRequest;
};

export default async (username:string):Promise<UserClass> => {
  const userReq = await axios(`https://www.codewars.com/api/v1/users/${username}`).catch((e)=> {
    throw new Error(e)
  });
  const userData = { ...userReq.data, codewarsUsername: userReq.data.username };
  userData.completedKatas = [];
  let currentPage = 0;
  let totalPages = 0;
  do {
    const completeKatasReq = await axios(`https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${currentPage}`).catch(err =>{
      throw new Error(err)
    });
    userData.completedKatas.push(...completeKatasReq.data.data);
    totalPages = completeKatasReq.data.TotalPages - 1;
    currentPage++;
  } while (totalPages > currentPage)

  const result = await User.findOneAndUpdate({ codewarsUsername: userData.codewarsUsername }, userData, { new: true, upsert: true });
  return result
}
