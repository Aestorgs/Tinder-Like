import { Home } from './home.entity';
import { Profil } from './profil.entity';
import { Users } from './users.entity';

// index est de afficher les tables dans postgres
const entities = [Users, Profil, Home];

export default entities;
