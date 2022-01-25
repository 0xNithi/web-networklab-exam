import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user && user.email && req.method === 'GET') {
    const { data } = await supabase.from('Logs').select('started_at').eq('user_id', user.id);

    if (data && data[0]) {
      res.status(200).send(data[0]);
    } else {
      res.status(400).end();
    }
  } else if (user && user.email && req.method === 'POST') {
    const { data } = await supabase.from('Logs').insert([{ user_id: user.id }]);

    res.status(200).send(data && data[0]);
  } else {
    res.status(400).end();
  }
};
