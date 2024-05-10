import { useState, useEffect } from "react";

//BaseURL da API
import Api from "./config";

// requisição para dar get em todos os usuários (a api retorna apenas o name e o username)
export const useGetAllUsers = () => {

  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const getAllUsers = async () => {

    try {
      setLoading(true);
      
      const response = await Api.get("/allUsers");

      setUsersList(response.data);

      setLoading(false);
    } 

    catch (error) {
      setLoading(false);

      if (error.response) {
        // a resposta foi recebida, mas tem um status diferente de 2xx
        const errorMessage = error.response.data.message || "Ocorreu um erro ao buscar a lista de usuários.";
        alert(`${errorMessage}\n\nCódigo do erro: ${error.response.status}`);
      
      } else if (error.request) {
        // a solicitação foi feita, mas não recebeu resposta
        alert("Não foi recebida resposta do servidor.");
      
      } else {
        // ocorreu um erro durante a configuração da solicitação
        alert("Ocorreu um erro ao enviar a requisição.");
      }
    }
  };

  getAllUsers();
  }, []);

  return { usersList, loading };
};

// requisção para dar get nas informações do usuário que está logado
export const useGetUserLoged = () => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const getUserLoged = async () => {

    try {
      setLoading(true);
      
      const response = await Api.get("/userLoged");

      setUser(response.data);

      setLoading(false);
    } 

    catch (error) {
      setLoading(false);

      if (error.response) {
        // a resposta foi recebida, mas tem um status diferente de 2xx
        const errorMessage = error.response.data.message || "Ocorreu um erro ao buscar as informações do usuário.";
        alert(`${errorMessage}\n\nCódigo do erro: ${error.response.status}`);
      
      } else if (error.request) {
        // a solicitação foi feita, mas não recebeu resposta
        alert("Não foi recebida resposta do servidor.");
      
      } else {
        // ocorreu um erro durante a configuração da solicitação
        alert("Ocorreu um erro ao enviar a requisição.");
      }
    }
  };

  getUserLoged();
  }, []);

  return { user, loading };
};