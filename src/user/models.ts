import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = parseInt(
    process.env.SALT_ROUNDS?process.env.SALT_ROUNDS:'',
);
if (!SALT_ROUNDS) {
  throw new Error('salt round not defined');
}
interface IBaseUser {
    username: string;
    password: string;
  }
const baseUserSchema = new mongoose.Schema<IBaseUser>({
  username: {
    type: String,
    minlength: 6,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
});
baseUserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // hash the password using our new salt
  bcrypt.hash(this.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});
const baseUserModel = mongoose.model('User', baseUserSchema);
interface IManager extends IBaseUser{}
export const Manager = baseUserModel.discriminator<IManager>('Manager',
    new mongoose.Schema({}),
);

interface ICustomer extends IBaseUser{}

export const Customer = baseUserModel.discriminator<ICustomer>('Customer',
    new mongoose.Schema(),
);


