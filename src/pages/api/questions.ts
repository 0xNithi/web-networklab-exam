import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

const random = (seed: number): number => {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user && user.email && req.method === 'GET') {
    const seed = parseInt(user.email);
    const { data: choice } = await supabase.from('ChoiceQuestion').select('id, problem, choice, picture_url');
    const { data: text } = await supabase.from('TextQuestion').select('id, problem, picture_url');

    if (choice && text) {
      const questions = [
        ...choice.map((question) => {
          question.choice = question.choice.sort(() => random(seed) - 0.5);
          return question;
        }),
        ...text,
      ].sort(() => random(seed) - 0.5);
      res.status(200).send(questions);
    }
  } else {
    res.status(400).end();
  }
};
