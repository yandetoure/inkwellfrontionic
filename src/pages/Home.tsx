import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import MockApp from '../mock/MockApp';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MockApp />
      </IonContent>
    </IonPage>
  );
};

export default Home;
