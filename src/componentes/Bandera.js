import { View } from 'react-native';

import SeccionBandera from './src/componentes/SeccionBandera';
import aguila from './assets/aguila.png';

function BanderaContenedor(props) {
    return (
      <View style={{
        width: '100%',
        marginTop: 10,
      }}>
        {props.children}
      </View>
    )
  }
  
  const SeccionVerde = () => {
    return <SeccionBandera titulo="Verde" color="green" />
  }
  
  function BanderaMexico() {
    return (
      <BanderaContenedor>
        <SeccionVerde />
        <SeccionBandera titulo="Blanco" color="white" icon={aguila} resizeMode="cover" />
        <SeccionBandera titulo="Rojo" color="red" />
      </BanderaContenedor>
    )
  }
  
  function BanderaItalia() {
    return (
      <BanderaContenedor>
        <SeccionVerde />
        <SeccionBandera titulo="Blanco" color="white" />
        <SeccionBandera titulo="Rojo" color="red" />
      </BanderaContenedor>
    )
  }