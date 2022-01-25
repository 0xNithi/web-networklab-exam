import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user && user.email && req.method === 'GET') {
    const { data } = await supabase.from('Submission').select('id').eq('user_id', user.id);

    if (data && data[0]) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } else if (user && user.email && req.method === 'POST') {
    const { answer } = JSON.parse(req.body);

    const { error } = await supabase.from('Submission').insert([{ user_id: user.id, answer }]);

    if (error) {
      res.status(400).end();
    } else {
      res.status(200).end();
    }
  } else {
    res.status(400).end();
  }
};
