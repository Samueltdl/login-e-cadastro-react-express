import React, { useState } from 'react';

import { useGetUsersByPage, useGetUserLoged } from '../services/getUser'; // importando hook de requisição

// components
import Loader from '../components/loader';
import NavBar from '../components/NavBar';

export default function Home() {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  
  const { user, loading } = useGetUserLoged();
  const { usersList } = useGetUsersByPage(page, perPage);
  //console.log(user);
  //console.log(usersList);
  
  const containerStyle = 'inset-0 p-4 bg-white rounded-lg shadow-md shadow-gray-900' // estilo dos dois containers de informação principais
  const pageButtonStyle = 'font-semibold text-black hover:text-blue-600 duration-200 cursor-pointer' // estilo dos botões de avançar e retroceder página
  
  const userLogedInfo = (label, info) => {
    return (
      <div className='flex space-x-2 text-md'>
          <p className='font-semibold'>{label}</p>
          <p>{info}</p>
        </div>
    );
  }
  
  return (
    <>
    
      <div className="fixed inset-0 overflow-y-auto bg-blue-200 flex flex-col justify-center items-center"> 
        <NavBar />
      
        <div className='grid grid-cols-2 w-full gap-x-20 rounded-lg px-24'>

          <div className={containerStyle}>
            
            <div className='flex flex-col space-y-3'>

              <h1 className='text-center text-xl font-semibold border-b border-gray-300'>Minhas informações:</h1>

              <div className='flex flex-col space-y-4'>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {user && (
                    <>
                      {userLogedInfo('ID:', user.userId)}
                      {userLogedInfo('Nome:', user.name)}
                      {userLogedInfo('E-mail:', user.email)}
                      {userLogedInfo('Nome de usuário:', user.username)}
                      {userLogedInfo('Data de registro:', user.registrationDate.split('T')[0])}
                    </>
                  )}
                </>
              )}
              </div>

            </div>

          </div>

          <div className={containerStyle}>

            <h1 className='text-center text-xl font-semibold border-b border-gray-300'>Usuários cadastrados:</h1>

            <div className="grid grid-cols-2 h-10 mx-3 my-1.5 px-4 rounded bg-white hover:bg-gray-100 text-sm">
              <p className="flex items-center">Nome:</p>
              <p className="flex items-center">Nome de usuário:</p>
              
            </div>
            {usersList.map((user) => (
              <div className="grid grid-cols-2 h-20 mx-3 my-1.5 px-4 rounded bg-white hover:bg-gray-100 text-sm">
                <p className="flex items-center">{user.name}</p>
                <p className="flex items-center">{user.username}</p>
              </div>
            ))}

            <div className='flex justify-center gap-x-3'>
              <button className={pageButtonStyle} type='button' disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)}>anterior</button>
              <p className='font-bold text-lg text-blue-500'>{page}</p>
              <button className={pageButtonStyle} type='button' onClick={() => setPage(page + 1)}>próximo</button>
            </div>

          </div>
          
        </div>

      </div>
    </>
  )
}
