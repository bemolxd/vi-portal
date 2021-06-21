import { User } from '../entities/User';
import { MyContext } from '../types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username lenght must be grater than 3!',
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Password lenght must be grater than 3!',
          },
        ],
      };
    }
    const hashedPass = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPass,
    });
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already taken!',
            },
          ],
        };
      }
      console.log(error.message);
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'This user does not exist!',
          },
        ],
      };
    }
    const validPass = await argon2.verify(user.password, options.password);
    if (!validPass) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password!',
          },
        ],
      };
    }
    return { user };
  }
}
