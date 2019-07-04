// dependencies
import crypto from 'crypto';
import getToken from '../../shared/utils/getToken';
import Client from '../models/auth/Client';
import '../configs/dbConnection';


const {
  npm_config_name: name,
} = process.env;

if (name) {
  // generating clientId
  const clientId = getToken(name);
  // generating clientSecret
  const clientSecret = getToken(name);

  Client.create({
    name,
    clientId,
    clientSecret,
  }).then(({ _doc: client }) => {
    console.log('Client created successfuly', client);
    process.exit(0);
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  console.error('Parameter "name" is undefined');
  process.exit(1);
}
