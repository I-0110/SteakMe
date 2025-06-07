import { User, Steak } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  favoriteId: string[];
  answers: {
    priority: string;
    doneness: string;
    recommendation: string;
  }[];
}

interface ISteak {
  _id: string;
  name: string;
  imageUrl: string;
  priorities: string[];
  doneness: string[];
  description: string;
}

interface UserArgs {
  userId: string;
}

interface AddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

interface AddFavoriteArgs {
  userId: string;
  favorite: string;
}

interface RemoveFavoriteArgs {
  favorite: string;
}

interface Context {
  user?: IUser;
}

const resolvers = {
  Query: {
    steaks: async (): Promise<ISteak[]> => {
      return await Steak.find({});
    },
    users: async (): Promise<IUser[]> => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: UserArgs): Promise<IUser | null> => {
      return await User.findOne({ _id: userId });
    },
    me: async (_parent: any, _args: any, context: Context): Promise<IUser | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    getRecommendation: async (_parent: any, { priority, doneness}: { priority: string; doneness: string }): Promise<ISteak | null> => {
      const results = await Steak.find({
        priorities: priority,
        doneness: doneness,
      });

      if (!results.length) return null;
      return results[Math.floor(Math.random() * results.length)];
    },
  },  

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: IUser }> => {
      const userDoc = await User.create({ ...input });
      const token = signToken(userDoc.name, userDoc.email, userDoc._id);
      return { token, user: userDoc.toObject() as IUser };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUser }> => {
      const userDoc = await User.findOne({ email });
      if (!userDoc) throw AuthenticationError;
      
      const correctPw = await userDoc.isCorrectPassword(password);
      if (!correctPw) throw AuthenticationError;
    
      const token = signToken(userDoc.name, userDoc.email, userDoc._id);
      return { token, user: userDoc.toObject() as IUser };
    },
    addFavorite: async (_parent: any, { userId, favorite }: AddFavoriteArgs, context: Context): Promise<IUser | null> => {
      if (!context.user) throw AuthenticationError;
      return await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { favoriteId: favorite },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    },
    removeUser: async (_parent: any, _args: any, context: Context): Promise<IUser | null> => {
      if (!context.user) throw AuthenticationError;
      return await User.findOneAndDelete({ _id: context.user._id });
    },
    removeFavorite: async (_parent: any, { favorite }: RemoveFavoriteArgs, context: Context): Promise<IUser | null> => {
      if (!context.user) throw AuthenticationError; 
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { favoritesId: favorite } },
        { new: true }
      );
    },
  },
};

export default resolvers;
