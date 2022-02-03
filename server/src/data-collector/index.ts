/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import mongoose from 'mongoose';
import axios from 'axios';
import { UserModel as User, CompleteKataClass } from '../entities/user';
import { KataModel as Kata } from '../entities/kata';

const fetchKataInfo = async (kataIds: string[]):Promise<any> => {
  const existingKatas: string[] = await Kata.find({ id: { $in: kataIds } }).map((e: mongoose.Types.ObjectId) => e._id.toString);
  kataIds.filter((e) => !existingKatas.includes(e)).forEach(async (e) => {
    let getKata = await axios(`https://www.codewars.com/api/v1/code-challenges/${e}`);
    getKata = { ...getKata.data, _id: getKata.data.id };
    await Kata.findOneAndUpdate({ _id: e }, getKata, { upsert: true }).exec();
  });
};

const fetchFromCodeWars = async (username:string) => {
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

  await fetchKataInfo(katasToFetch);

  await User.findOneAndUpdate({ codewarsUsername: userData.codewarsUsername }, userData, { upsert: true }).exec();
}

export default async () => {
  fetchFromCodeWars('BerkeliH')
}
