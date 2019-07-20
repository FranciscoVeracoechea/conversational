// dependencies
import crypto from 'crypto';
import faker from 'faker';
import User from '../models/User';
import '../configs/dbConnection';


const {
  npm_config_count: count,
} = process.env;


(async () => {

for (let i = 0; i < (count || 20); i++) {

  const fake = {
    username: faker.internet.userName(),
    password: 'secret',
    email: faker.internet.email(),
    description: faker.lorem.sentences(5),
  };

  const asd = await User.create(fake);
  console.log(asd);
};

process.exit(0);


})();
