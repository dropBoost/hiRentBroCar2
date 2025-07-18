'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Utenti() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('veicoli').select('*');
      if (!error) setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista utenti</h1>
      <ul>
        {users.map((veicolo, index) => (
          <li className='text-white' key={veicolo.UUID}>{veicolo.marca}</li>
        ))}
      </ul>
    </div>
  );
}