import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { event, session } = req.body;
  if ((event === 'SIGNED_IN' && session.user.email.endsWith('@kmitl.ac.th')) || event === 'SIGNED_OUT') {
    supabase.auth.api.setAuthCookie(req, res);
    res.status(200).json({ status: 'success' });
  }
  res.status(403).json({ status: 'error', message: 'please login with @kmitl.ac.th' });
};
