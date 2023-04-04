import RealmPlugin from 'realm-flipper-plugin-device';
import {realmConfig, RealmContext} from './app/realm';
import Main from './app/src/Main';
import Realm from 'realm';
const {RealmProvider} = RealmContext;

function App() {
  return (
    <RealmProvider>
      <RealmPlugin realms={[new Realm({realmConfig})]} />
      <Main />
    </RealmProvider>
  );
}

export default App;
