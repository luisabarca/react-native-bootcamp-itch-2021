import { useEffect, useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";

export const useGetFirestoreAlumnos = () => {
  const db = firebase.firestore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("alumnos").onSnapshot((docs) => {
      const temporal = [];

      docs.forEach((doc) => {
        temporal.push(doc.data());
      });

      setItems(temporal);
    });
  }, []);

  return items;
};
