import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';
import { Kata } from './kata';

export class AuthoredCollection {
    @prop({ ref: () => User })
      createdBy: Ref<User>

    @prop()
      createdByName: string

    @prop()
      name: string;

    @prop()
      katas?: mongoose.Types.Array<Kata>
}

export const AuthoredCollectionModel = getModelForClass(AuthoredCollection);
